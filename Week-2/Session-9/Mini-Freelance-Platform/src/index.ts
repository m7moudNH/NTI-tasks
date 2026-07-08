enum JobStatus {
  Open,
  InProgress,
  Review,
  Completed,
}

type Skill = "TypeScript" | "NodeJS" | "React" | "UI/UX";

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IFreelancer extends IUser {
  skills: Skill[];
  hourlyRate: number;
}

interface IClient extends IUser {
  budget: number;
}

interface IProject {
  id: number;
  budget: number;
  status: JobStatus;
  projectDetails: {
    clientId: number;
    assignedFreelancerId?: number;
  };
}

type Bid = {
  freelancerId: number;
  bidAmount: number;
};

class Proposal {
  constructor(
    public projectId: number,
    public readonly bids: Bid[] = []
  ) {}

  addBid(bid: Bid): void {
    this.bids.push(bid);
  }
}

class PlatformManager {
  private freelancers: IFreelancer[] = [];
  private clients: IClient[] = [];
  private projects: IProject[] = [];
  private proposals: Proposal[] = [];

  static totalProjectsRevenue = 0;

  addUser(user: IFreelancer | IClient): void {
    if ("skills" in user) {
      this.freelancers.push(user);
    } else {
      this.clients.push(user);
    }
  }

  addProject(project: IProject): void {
    this.projects.push(project);
  }

  submitProposal(proposal: Proposal): void {
    this.proposals.push(proposal);
  }

  assignProjectToFreelancer(
    projectId: number,
    freelancerId: number
  ): void {
    const project = this.projects.find(
      (p) => p.id === projectId
    );

    if (!project) {
      throw new Error("Project not found");
    }

    project.projectDetails.assignedFreelancerId = freelancerId;
    project.status = JobStatus.InProgress;
  }

  completeProject(projectId: number): void {
    const project = this.projects.find(
      (p) => p.id === projectId
    );

    if (!project) {
      throw new Error("Project not found");
    }

    project.status = JobStatus.Completed;

    const commission = project.budget * 0.1;
    PlatformManager.totalProjectsRevenue += commission;
  }

  getProjects(): IProject[] {
    return this.projects;
  }

  getRevenue(): number {
    return PlatformManager.totalProjectsRevenue;
  }
}

class FilterEngine<T>{
  filterByProperty(items: T[], property: keyof T, value: any): T[]{
    return items.filter((e)=>{
      return e[property] === value;
    });
  }
}

const manager = new PlatformManager();
const freelancer: IFreelancer = {
  id: 1,
  name: "mahmoud",
  email: "mahmoud@mail.com",
  skills: ["TypeScript", "NodeJS"],
  hourlyRate: 25,
};
const client: IClient = {
  id: 2,
  name: "Ahmed",
  email: "ahmed@mail.com",
  budget: 5000,
};


manager.addUser(freelancer);
manager.addUser(client);
manager.addProject({
  id: 1,
  budget: 5000,
  status: JobStatus.Open,
  projectDetails: {
    clientId: client.id,
  },
});

const proposal = new Proposal(1);
proposal.addBid({
  freelancerId: freelancer.id,
  bidAmount: 4500,
});
manager.submitProposal(proposal);
manager.assignProjectToFreelancer(1, freelancer.id);
manager.completeProject(1);
console.log(manager.getProjects());
console.log("Platform Revenue:", manager.getRevenue());