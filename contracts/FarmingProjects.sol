// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FarmingProjects {
    struct Project {
        uint256 id;
        address owner;
        string title;
        string description;
        string specificAddress; // Dirección específica (ej: Vereda El Progreso)
        string city; // Ciudad (ej: Pitalito)
        string department; // Departamento (ej: Huila)
        string country; // País (ej: Colombia)
        string imageUrl;
        uint256 targetAmount;
        uint256 currentAmount;
        bool isActive;
        mapping(address => uint256) investments;
    }

    uint256 public projectCounter;
    mapping(uint256 => Project) public projects;

    // Add getter for projectCounter with explicit return value
    function getProjectCounter() public view returns (uint256 counter) {
        counter = projectCounter;
    }

    event ProjectCreated(
        uint256 indexed projectId,
        address indexed owner,
        string title,
        uint256 targetAmount
    );

    event ProjectDeleted(uint256 indexed projectId);

    event InvestmentMade(
        uint256 indexed projectId,
        address indexed investor,
        uint256 amount
    );

    event FundsWithdrawn(
        uint256 indexed projectId,
        address indexed owner,
        uint256 amount
    );

    modifier onlyProjectOwner(uint256 _projectId) {
        require(
            projects[_projectId].owner == msg.sender,
            "Not the project owner"
        );
        _;
    }

    function createProject(
        string memory _title,
        string memory _description,
        string memory _specificAddress,
        string memory _city,
        string memory _department,
        string memory _country,
        string memory _imageUrl,
        uint256 _targetAmount
    ) external returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_targetAmount > 0, "Target amount must be greater than 0");

        projectCounter++;
        Project storage newProject = projects[projectCounter];

        newProject.id = projectCounter;
        newProject.owner = msg.sender;
        newProject.title = _title;
        newProject.description = _description;
        newProject.specificAddress = _specificAddress;
        newProject.city = _city;
        newProject.department = _department;
        newProject.country = _country;
        newProject.imageUrl = _imageUrl;
        newProject.targetAmount = _targetAmount;
        newProject.currentAmount = 0;
        newProject.isActive = true;

        emit ProjectCreated(projectCounter, msg.sender, _title, _targetAmount);

        return projectCounter;
    }

    function deleteProject(uint256 _projectId) external {
        require(
            _projectId > 0 && _projectId <= projectCounter,
            "Invalid project ID"
        );
        require(
            projects[_projectId].owner == msg.sender,
            "Only owner can delete project"
        );
        require(projects[_projectId].isActive, "Project is already inactive");
        require(
            projects[_projectId].currentAmount == 0,
            "Cannot delete project with investments"
        );

        projects[_projectId].isActive = false;
        emit ProjectDeleted(_projectId);
    }

    function investInProject(uint256 _projectId) external payable {
        require(
            _projectId > 0 && _projectId <= projectCounter,
            "Invalid project ID"
        );
        Project storage project = projects[_projectId];

        require(project.isActive, "Project is not active");
        require(msg.value > 0, "Investment amount must be greater than 0");
        require(
            project.currentAmount + msg.value <= project.targetAmount,
            "Investment would exceed target amount"
        );

        project.investments[msg.sender] += msg.value;
        project.currentAmount += msg.value;

        if (project.currentAmount == project.targetAmount) {
            project.isActive = false;
        }

        emit InvestmentMade(_projectId, msg.sender, msg.value);
    }

    function withdrawFunds(
        uint256 _projectId
    ) external onlyProjectOwner(_projectId) {
        Project storage project = projects[_projectId];
        require(project.currentAmount > 0, "No funds to withdraw");

        uint256 amount = project.currentAmount;
        project.currentAmount = 0;
        project.isActive = false;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(_projectId, msg.sender, amount);
    }

    function getProjectDetails(
        uint256 _projectId
    )
        external
        view
        returns (
            address owner,
            string memory title,
            string memory description,
            string memory specificAddress,
            string memory city,
            string memory department,
            string memory country,
            string memory imageUrl,
            uint256 targetAmount,
            uint256 currentAmount,
            bool isActive
        )
    {
        Project storage project = projects[_projectId];
        return (
            project.owner,
            project.title,
            project.description,
            project.specificAddress,
            project.city,
            project.department,
            project.country,
            project.imageUrl,
            project.targetAmount,
            project.currentAmount,
            project.isActive
        );
    }

    function getInvestmentAmount(
        uint256 _projectId,
        address _investor
    ) external view returns (uint256) {
        return projects[_projectId].investments[_investor];
    }
}
