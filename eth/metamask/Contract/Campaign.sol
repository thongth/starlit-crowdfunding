pragma solidity ^0.4.22;

interface IERC20 {
    function transfer(address to, uint value) external returns (bool);
    function balanceOf(address who) external returns (uint);
    function approve(address spender, uint value) external;
    function transferFrom(address from, address to, uint value) external;
    function allowance(address owner, address spender) external returns (uint);
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
    }
    
    // === Fields ===
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    uint public votingThreshold;
    mapping(address => bool) public approvers;
    mapping(address => uint) public contributions;
    uint public totalContribution;
    uint public approversCount;
    string name;
    string description;
    IERC20 usdt;
    
    // === Methods ===
    
    // == Modifier ==
    modifier authorization(){
        require(msg.sender == manager);
        _;
    }
    
    // == constructor ==
    //Setting the manager and minimum amount to contribute
    constructor(string _name, string _description, uint minimum, uint threshold, address creator) public {
        require(threshold > 30, "Too low threshold");
        name = _name;
        description = _description;
        manager = creator;
        minimumContribution = minimum;
        votingThreshold = threshold;
        totalContribution = 0;
        
        usdt = IERC20(address(0xe14dF5159c6c75eAE5Cc14f93Dd2E4BF970C7Cd8)); //test address
    }
    
    //donate money to compaign and became an approver
    function contribute(uint tokens) public{
        
        uint256 allowance = usdt.allowance(msg.sender, this);
        require(allowance >= tokens, "Check the token allowance!");
        usdt.transferFrom(msg.sender, this, tokens);

        if(approvers[msg.sender]!= true){
            require(tokens >= minimumContribution);
            approvers[msg.sender] = true;
            contributions[msg.sender] = tokens;
            approversCount++;
        }else{
            contributions[msg.sender] += tokens;
        }
        
        totalContribution += tokens;
    }
    
    //creating a new request by the manager
    function createRequest(string _description, uint value, address recipient)
        public authorization{
            Request memory newReq = Request({
                description : _description,
                value : value,
                recipient : recipient,
                complete : false,
                approvalAmount : 0
            });
            
            requests.push(newReq);
        }
        
    //approving a particular request by the user approvalAmount
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        require(!request.complete);
        
        request.approvals[msg.sender] = true;
        request.approvalAmount += contributions[msg.sender];
    }
    
    //final approval of request by the manager and sending the amount
    function finalizeRequest(uint index) public authorization{
        Request storage request = requests[index];
        
        require(request.approvalAmount > (request.approvalAmount/2));
        require(!request.complete);
        
        usdt.transfer(request.recipient, request.value);
        
        request.complete = true;
        
    }

    // function to retrieve minimumContribution, Campaign balance, no of requests , no of Contributors and manager address
    function getSummary() public view returns (
        uint, uint, uint, uint, address
        ) {
        return (
            minimumContribution,
            address(this).balance,
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