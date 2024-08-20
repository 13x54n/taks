export interface Case {
  case_id: string;
  title: string;
  status: "Vote Pending" | "Active" | "Closed";
  category: string;
  outcome: "Resolved" | "Unresolved";
  date_created: string;
  date_voting_started: string | null;
  date_closed: string | null;
  juror_count: number;
  votes: object;
  is_current_user_juror: boolean;
  current_user_decision: string;
  expiry_time: string;
  ipfs_hash: string;
}

export const mockCasesData: Case[] = [
  {
    case_id: "case_004",
    title: "Governance Vote Challenge",
    status: "Vote Pending",
    category: "Governance Vote",
    outcome: "Unresolved",
    date_created: "2024-08-04",
    date_voting_started: null,
    date_closed: null,
    juror_count: 5,
    votes: {
      yes: 3,
      no: 1,
      pending: 1,
      total_votes: 5,
    },
    is_current_user_juror: false,
    current_user_decision: "In Favor of Employer",
    expiry_time: "2024-08-19T18:43:23Z",
    ipfs_hash: "QmXf47Xf8a3B7zY2Kd8jkQ7tGPh6psmYnSbLRGkgZTRzV2",
  },
  {
    case_id: "case_005",
    title: "Policy Amendment Vote",
    status: "Active",
    category: "Governance Vote",
    outcome: "Resolved",
    date_created: "2024-08-05",
    date_voting_started: null,
    date_closed: null,
    juror_count: 5,
    votes: {
      yes: 2,
      no: 2,
      pending: 0,
      total_votes: 4,
    },
    is_current_user_juror: true,
    current_user_decision: "Against Employer",
    expiry_time: "2024-08-19T19:00:00Z",
    ipfs_hash: "QmXf47Xf8a3B7zY2Kd8jkQ7tGPh6psmYnSbLRGkgZTRzV2",
  },
  {
    case_id: "case_006",
    title: "Budget Approval Vote",
    status: "Vote Pending",
    category: "Governance Vote",
    outcome: "Unresolved",
    date_created: "2024-08-06",
    date_voting_started: null,
    date_closed: null,
    juror_count: 5,
    votes: {
      yes: 4,
      no: 0,
      pending: 1,
      total_votes: 5,
    },
    is_current_user_juror: true,
    current_user_decision: "In Favor of Employer",
    expiry_time: "2024-08-19T20:00:00Z",
    ipfs_hash: "QmXf47Xf8a3B7zY2Kd8jkQ7tGPh6psmYnSbLRGkgZTRzV2",
  },
  {
    case_id: "case_007",
    title: "New Project Vote",
    status: "Vote Pending",
    category: "Governance Vote",
    outcome: "Resolved",
    date_created: "2024-08-07",
    date_voting_started: null,
    date_closed: null,
    juror_count: 5,
    votes: {
      yes: 2,
      no: 3,
      pending: 0,
      total_votes: 5,
    },
    is_current_user_juror: true,
    current_user_decision: "Against Employer",
    expiry_time: "2024-08-19T21:00:00Z",
    ipfs_hash: "QmXf47Xf8a3B7zY2Kd8jkQ7tGPh6psmYnSbLRGkgZTRzV2",
  },
  {
    case_id: "case_008",
    title: "Hiring Policy Vote",
    status: "Vote Pending",
    category: "Governance Vote",
    outcome: "Unresolved",
    date_created: "2024-08-08",
    date_voting_started: null,
    date_closed: null,
    juror_count: 5,
    votes: {
      yes: 2,
      no: 1,
      pending: 2,
      total_votes: 5,
    },
    is_current_user_juror: true,
    current_user_decision: "In Favor of Employer",
    expiry_time: "2024-08-19T22:00:00Z",
    ipfs_hash: "QmXf47Xf8a3B7zY2Kd8jkQ7tGPh6psmYnSbLRGkgZTRzV2",
  },
  {
    case_id: "case_012",
    title: "Strategic Initiative Vote",
    status: "Closed",
    category: "Governance Vote",
    outcome: "Resolved",
    date_created: "2024-08-12",
    date_voting_started: null,
    date_closed: null,
    juror_count: 5,
    votes: {
      yes: 3,
      no: 2,
      pending: 0,
      total_votes: 5,
    },
    is_current_user_juror: true,
    current_user_decision: "In Favor of Employer",
    expiry_time: "2024-08-20T02:00:00Z",
    ipfs_hash: "QmXf47Xf8a3B7zY2Kd8jkQ7tGPh6psmYnSbLRGkgZTRzV2",
  },
  {
    case_id: "case_013",
    title: "Technology Upgrade Vote",
    status: "Vote Pending",
    category: "Governance Vote",
    outcome: "Unresolved",
    date_created: "2024-08-13",
    date_voting_started: null,
    date_closed: null,
    juror_count: 5,
    votes: {
      yes: 2,
      no: 2,
      pending: 1,
      total_votes: 5,
    },
    is_current_user_juror: true,
    current_user_decision: "Against Employer",
    expiry_time: "2024-08-20T03:00:00Z",
    ipfs_hash: "QmXf47Xf8a3B7zY2Kd8jkQ7tGPh6psmYnSbLRGkgZTRzV2",
  },
];
