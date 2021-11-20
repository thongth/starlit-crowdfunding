pragma solidity ^0.4.22;

interface IERC20 {
    function transfer(address to, uint value) external returns (bool);
    function balanceOf(address who) external returns (uint);
    function approve(address spender, uint value) external;
    function transferFrom(address from, address to, uint value) external;
    function allowance(address owner, address spender) external returns (uint);
}

interface IDateTime { //at 0x92482Ba45A4D2186DafB486b322C6d0B88410FE7
    function isLeapYear ( uint16 year ) external pure returns ( bool );
    function leapYearsBefore ( uint256 year ) external pure returns ( uint256 );
    function getDaysInMonth ( uint8 month, uint16 year ) external pure returns ( uint8 );
    function getYear ( uint256 timestamp ) external pure returns ( uint16 );
    function getMonth ( uint256 timestamp ) external pure returns ( uint8 );
    function getDay ( uint256 timestamp ) external pure returns ( uint8 );
    function getHour ( uint256 timestamp ) external pure returns ( uint8 );
    function getMinute ( uint256 timestamp ) external pure returns ( uint8 );
    function getSecond ( uint256 timestamp ) external pure returns ( uint8 );
    function getWeekday ( uint256 timestamp ) external pure returns ( uint8 );
    function toTimestamp ( uint16 year, uint8 month, uint8 day ) external pure returns ( uint256 timestamp );
    function toTimestamp ( uint16 year, uint8 month, uint8 day, uint8 hour ) external pure returns ( uint256 timestamp );
    function toTimestamp ( uint16 year, uint8 month, uint8 day, uint8 hour, uint8 minute ) external pure returns ( uint256 timestamp );
    function toTimestamp ( uint16 year, uint8 month, uint8 day, uint8 hour, uint8 minute, uint8 second ) external pure returns ( uint256 timestamp );
}



contract CampaignFactory{
    // ==== Fields ====
    address[] public deployedCampaigns;
    
    // ==== Modifier ====
    // ==== create a new contract ====
    function createCampaign(string name, string description, uint minimum, uint threshold) public {
        address newCampaign = new Campaign(name, description, minimum, threshold, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    // ==== returning all the address of the deployed contract
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
    
}

contract Campaign{
    // collection of key value pairs
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalAmount;
        mapping(address => bool) approvals;
        uint256 expirationDT; //unix epoch time
    }
    
    struct TerminationRequest{
        string description;
        bool complete;
        uint approvalAmount;
        mapping(address => bool) approvals;
        uint256 expirationDT; //unix epoch time
    }
    
    struct _DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
    }
    
    // === Fields ===
    Request[] public requests;
    TerminationRequest[] public terminationRequests;
    address public manager;
    uint public minimumContribution;
    uint public votingThreshold;
    mapping(uint => address) public contributors;
    mapping(address => bool) public approvers;
    mapping(address => uint) public contributions;
    uint public totalContribution; //accumulated contributions, never decrease
    uint public currentContribution; //keep track of this contract's USDT tokens
    uint public approversCount;
    string name;
    string description;
    bool terminated;
    IERC20 usdt;
    
    // === Methods ===
    
    // == Modifier ==
    modifier authorization(){
        require(msg.sender == manager);
        _;
    }
    
    modifier Terminable(){
        require(!terminated);
        _;
    }
    
    // == constructor ==
    //Setting the manager and minimum amount to contribute
    constructor(string _name, string _description, uint minimum, uint threshold, address creator) public {
        require(threshold > 30, "Threshold can't be lower than 30%");
        require(threshold <= 100, "Threshold can't be higher than 100%");
        name = _name;
        description = _description;
        manager = creator;
        minimumContribution = minimum;
        votingThreshold = threshold;
        totalContribution = 0;
        currentContribution = 0;
        terminated = false;
        
        usdt = IERC20(address(0xe14dF5159c6c75eAE5Cc14f93Dd2E4BF970C7Cd8)); //test address
        //IDateTime dt = IDateTime(address(0x92482Ba45A4D2186DafB486b322C6d0B88410FE7)); //for Datetime Conversion
    }
    
    //donate money to compaign and became an approver
    function contribute(uint tokens) public Terminable{
        
        uint256 allowance = usdt.allowance(msg.sender, this);
        require(allowance >= tokens, "Check the token allowance!");
        usdt.transferFrom(msg.sender, this, tokens);

        if(approvers[msg.sender]!= true){
            require(tokens >= minimumContribution);
            approvers[msg.sender] = true;
            contributions[msg.sender] = tokens;
            contributors[approversCount] = msg.sender;
            approversCount++;
        }else{
            contributions[msg.sender] += tokens;
        }
        
        totalContribution += tokens;
        currentContribution += tokens;
    }
    
    //creating a new request by the manager, currently accept epoch time
    function createRequest(string _description, uint value, address recipient, uint256 expireDT) public authorization{
            Request memory newReq = Request({
                description : _description,
                value : value,
                recipient : recipient,
                complete : false,
                approvalAmount : 0,
                expirationDT : expireDT
            });
            
            requests.push(newReq);
        }
        
    function createTerminationRequest(string _description) public authorization Terminable{
            TerminationRequest memory newReq = TerminationRequest({
                description : _description,
                complete : false,
                approvalAmount : 0,
                expirationDT : now + 2592000 // 30 days
            });
            
            terminationRequests.push(newReq);
        }
        
    //approving a particular request by the user approvalAmount
    function approveRequest(uint index) public Terminable{
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        require(!request.complete);
        require(request.expirationDT > now, "The request has expired.");
        
        request.approvals[msg.sender] = true;
        request.approvalAmount += contributions[msg.sender];
    }
    
    //approving a termination request
    function approveTerminationRequest(uint index) public Terminable{
        TerminationRequest storage request = terminationRequests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        require(!request.complete);
        require(request.expirationDT > now, "The request has expired.");
        
        request.approvals[msg.sender] = true;
        request.approvalAmount += contributions[msg.sender];
    }
    
    //final approval of request by the manager and sending the amount
    function finalizeRequest(uint index) public authorization Terminable{
        Request storage request = requests[index];
        
        require(request.approvalAmount > (totalContribution * votingThreshold/100));
        require(!request.complete);
        
        if(request.expirationDT <= now){
            usdt.transfer(request.recipient, request.value);
            currentContribution -= request.value; 
        }
        
        request.complete = true;
        
    }
    
    //final approval of termination request by anyone and distribute money back
    function finalizeTerrminationRequest(uint index) public Terminable{
        TerminationRequest storage request = terminationRequests[index];
        
        require(request.approvalAmount > (totalContribution*2/3)); // supermajority vote
        require(!request.complete);
        
        if(request.expirationDT <= now){
            //distribute money back
            uint tempContribution = currentContribution;
            for(uint8 i=0; i<=approversCount; i++){
                address addr = contributors[i];
                uint contribution = contributions[addr];
                uint refundAmount = contribution / totalContribution * tempContribution;
                
                if(refundAmount <= currentContribution){
                    usdt.transfer(addr, refundAmount);
                    currentContribution -= refundAmount;
                }else{
                    break;
                }
            }
            usdt.transfer(msg.sender, currentContribution);
            
        }
        
        terminated = true;
        request.complete = true;
        
    }

    // function to retrieve minimumContribution, Campaign current balance, no of requests , no of Contributors and manager address
    function getSummary() public view returns (
        uint, uint, uint, uint, address
        ) {
        return (
            minimumContribution,
            currentContribution,
            requests.length,
            approversCount,
            manager
            ); 
    }

    // returing no of requests
    function getRequestsCount() public view returns (uint) {
        return  requests.length;
    }
    
}