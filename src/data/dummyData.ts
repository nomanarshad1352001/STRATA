// ============ TYPES ============
export interface Company {
  id: string; name: string; logo: string; plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial'; usersCount: number; projectsCount: number;
  storageUsed: string; createdAt: string; owner: string;
}
export interface User {
  id: string; name: string; email: string; avatar: string; role: 'owner' | 'admin' | 'project_manager' | 'field_worker' | 'subcontractor' | 'client';
  status: 'active' | 'invited' | 'disabled'; companyId: string; phone: string; lastActive: string;
}
export interface Project {
  id: string; name: string; status: 'planning' | 'in_progress' | 'on_hold' | 'completed';
  budget: number; spent: number; progress: number; startDate: string; endDate: string;
  manager: string; companyId: string; address: string; type: string; description: string;
  clientName: string; image: string;
}
export interface Task {
  id: string; title: string; status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent'; assignee: string; projectId: string;
  dueDate: string; description: string; category: string;
}
export interface DailyLog {
  id: string; projectId: string; date: string; weather: string; temperature: string;
  workersOnSite: number; hoursWorked: number; summary: string; author: string;
  safetyIncidents: number; delaysReported: boolean;
}
export interface Document {
  id: string; name: string; type: 'drawing' | 'spec' | 'contract' | 'photo' | 'report' | 'permit';
  projectId: string; uploadedBy: string; uploadedAt: string; size: string; version: number; status: 'current' | 'superseded' | 'draft';
}
export interface RFI {
  id: string; number: string; subject: string; projectId: string; status: 'open' | 'answered' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent'; submittedBy: string; assignedTo: string;
  submittedDate: string; dueDate: string; description: string;
}
export interface ChangeOrder {
  id: string; number: string; title: string; projectId: string; status: 'draft' | 'submitted' | 'approved' | 'rejected';
  amount: number; submittedBy: string; submittedDate: string; description: string; reason: string;
}
export interface Subcontractor {
  id: string; company: string; trade: string; contact: string; email: string; phone: string;
  status: 'active' | 'prequalified' | 'inactive'; rating: number; projectsCompleted: number;
  insuranceExpiry: string; licenseNumber: string;
}
export interface Notification {
  id: string; type: 'info' | 'warning' | 'success' | 'error'; message: string;
  timestamp: string; read: boolean; link: string;
}
export interface AuditLog {
  id: string; action: string; user: string; timestamp: string; details: string; ip: string;
}
export interface Milestone {
  id: string; name: string; projectId: string; dueDate: string; status: 'upcoming' | 'completed' | 'overdue';
  description: string;
}
export interface BudgetItem {
  id: string; projectId: string; category: string; budgeted: number; actual: number; committed: number;
  variance: number;
}
export interface Comment {
  id: string; author: string; avatar: string; content: string; timestamp: string;
  mentions: string[];
}
export interface SubscriptionPlan {
  id: string; name: string; price: number; interval: 'monthly' | 'annual';
  features: string[]; maxUsers: number; maxProjects: number; storage: string;
  recommended?: boolean;
}

// ============ DUMMY DATA ============
export const companies: Company[] = [
  { id: 'c1', name: 'BuildRight Construction', logo: '🏗️', plan: 'enterprise', status: 'active', usersCount: 47, projectsCount: 12, storageUsed: '234 GB', createdAt: '2023-01-15', owner: 'John Mitchell' },
  { id: 'c2', name: 'Summit Builders Inc', logo: '🏔️', plan: 'professional', status: 'active', usersCount: 23, projectsCount: 8, storageUsed: '89 GB', createdAt: '2023-06-20', owner: 'Sarah Chen' },
  { id: 'c3', name: 'Metro Development Group', logo: '🌆', plan: 'enterprise', status: 'active', usersCount: 62, projectsCount: 18, storageUsed: '456 GB', createdAt: '2022-11-01', owner: 'Michael Roberts' },
  { id: 'c4', name: 'Coastal Contractors', logo: '🌊', plan: 'starter', status: 'trial', usersCount: 5, projectsCount: 2, storageUsed: '12 GB', createdAt: '2024-01-10', owner: 'Emily Watson' },
  { id: 'c5', name: 'Pioneer Engineering', logo: '⚙️', plan: 'professional', status: 'suspended', usersCount: 15, projectsCount: 6, storageUsed: '67 GB', createdAt: '2023-09-05', owner: 'David Park' },
];

export const users: User[] = [
  { id: 'u1', name: 'John Mitchell', email: 'john@buildright.com', avatar: 'JM', role: 'owner', status: 'active', companyId: 'c1', phone: '(555) 123-4567', lastActive: '2 min ago' },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@buildright.com', avatar: 'SC', role: 'admin', status: 'active', companyId: 'c1', phone: '(555) 234-5678', lastActive: '5 min ago' },
  { id: 'u3', name: 'Mike Rodriguez', email: 'mike@buildright.com', avatar: 'MR', role: 'project_manager', status: 'active', companyId: 'c1', phone: '(555) 345-6789', lastActive: '1 hour ago' },
  { id: 'u4', name: 'Lisa Thompson', email: 'lisa@buildright.com', avatar: 'LT', role: 'project_manager', status: 'active', companyId: 'c1', phone: '(555) 456-7890', lastActive: '30 min ago' },
  { id: 'u5', name: 'David Kim', email: 'david@buildright.com', avatar: 'DK', role: 'field_worker', status: 'active', companyId: 'c1', phone: '(555) 567-8901', lastActive: '15 min ago' },
  { id: 'u6', name: 'James Wilson', email: 'james@buildright.com', avatar: 'JW', role: 'field_worker', status: 'active', companyId: 'c1', phone: '(555) 678-9012', lastActive: '2 hours ago' },
  { id: 'u7', name: 'Robert Taylor', email: 'robert@external.com', avatar: 'RT', role: 'subcontractor', status: 'active', companyId: 'c1', phone: '(555) 789-0123', lastActive: '1 day ago' },
  { id: 'u8', name: 'Amanda Foster', email: 'amanda@client.com', avatar: 'AF', role: 'client', status: 'active', companyId: 'c1', phone: '(555) 890-1234', lastActive: '3 hours ago' },
  { id: 'u9', name: 'Carlos Mendez', email: 'carlos@buildright.com', avatar: 'CM', role: 'field_worker', status: 'invited', companyId: 'c1', phone: '(555) 901-2345', lastActive: 'Never' },
  { id: 'u10', name: 'Patricia Hughes', email: 'patricia@buildright.com', avatar: 'PH', role: 'admin', status: 'active', companyId: 'c1', phone: '(555) 012-3456', lastActive: '10 min ago' },
];

export const projects: Project[] = [
  { id: 'p1', name: 'Riverside Tower Complex', status: 'in_progress', budget: 45000000, spent: 28500000, progress: 63, startDate: '2023-03-01', endDate: '2025-06-30', manager: 'Mike Rodriguez', companyId: 'c1', address: '1200 River Drive, Austin, TX', type: 'Commercial High-Rise', description: 'A 32-story mixed-use tower with retail, office, and residential spaces. LEED Gold certified design with underground parking for 500 vehicles.', clientName: 'Riverside Development LLC', image: 'https://images.pexels.com/photos/2606383/pexels-photo-2606383.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { id: 'p2', name: 'Oakwood Residential Estate', status: 'in_progress', budget: 12000000, spent: 7200000, progress: 45, startDate: '2023-08-15', endDate: '2024-12-31', manager: 'Lisa Thompson', companyId: 'c1', address: '450 Oak Lane, Round Rock, TX', type: 'Residential', description: '24-unit luxury residential estate with community amenities including pool, clubhouse, and landscaped gardens.', clientName: 'Oakwood Properties', image: 'https://images.pexels.com/photos/2771935/pexels-photo-2771935.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { id: 'p3', name: 'Metro Central Station Renovation', status: 'planning', budget: 8500000, spent: 425000, progress: 5, startDate: '2024-02-01', endDate: '2025-08-31', manager: 'Mike Rodriguez', companyId: 'c1', address: '100 Central Ave, Austin, TX', type: 'Infrastructure', description: 'Complete renovation of the historic Metro Central Station including structural upgrades, modern HVAC, and accessibility improvements.', clientName: 'City of Austin', image: 'https://images.pexels.com/photos/15208954/pexels-photo-15208954.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { id: 'p4', name: 'Greenfield Shopping Center', status: 'in_progress', budget: 22000000, spent: 15400000, progress: 72, startDate: '2023-01-10', endDate: '2024-09-30', manager: 'Lisa Thompson', companyId: 'c1', address: '2800 Commerce Blvd, Cedar Park, TX', type: 'Commercial Retail', description: '150,000 sq ft shopping center with anchor tenant spaces, food court, and outdoor entertainment area.', clientName: 'Greenfield Retail Group', image: 'https://images.pexels.com/photos/37978684/pexels-photo-37978684.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { id: 'p5', name: 'Harbor Bridge Replacement', status: 'on_hold', budget: 35000000, spent: 5250000, progress: 15, startDate: '2023-11-01', endDate: '2026-03-31', manager: 'Mike Rodriguez', companyId: 'c1', address: 'Harbor Crossing, Corpus Christi, TX', type: 'Infrastructure', description: 'Replacement of the aging Harbor Bridge with a modern cable-stayed design. Currently on hold pending environmental review.', clientName: 'TxDOT', image: 'https://images.pexels.com/photos/10084627/pexels-photo-10084627.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { id: 'p6', name: 'Sunset Medical Center', status: 'completed', budget: 18000000, spent: 17200000, progress: 100, startDate: '2022-06-01', endDate: '2024-01-15', manager: 'Lisa Thompson', companyId: 'c1', address: '900 Health Parkway, San Antonio, TX', type: 'Healthcare', description: '60,000 sq ft medical facility with 4 operating rooms, imaging center, and outpatient clinic.', clientName: 'Sunset Health Systems', image: 'https://images.pexels.com/photos/31715450/pexels-photo-31715450.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
];

export const heroImages = {
  login: 'https://images.pexels.com/photos/12874977/pexels-photo-12874977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  onboarding: 'https://images.pexels.com/photos/19460224/pexels-photo-19460224.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  site1: 'https://images.pexels.com/photos/8961146/pexels-photo-8961146.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  site2: 'https://images.pexels.com/photos/8476865/pexels-photo-8476865.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  site3: 'https://images.pexels.com/photos/34247838/pexels-photo-34247838.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  site4: 'https://images.pexels.com/photos/31904474/pexels-photo-31904474.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  site5: 'https://images.pexels.com/photos/8482546/pexels-photo-8482546.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  site6: 'https://images.pexels.com/photos/15689819/pexels-photo-15689819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  site7: 'https://images.pexels.com/photos/8961006/pexels-photo-8961006.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  site8: 'https://images.pexels.com/photos/36771569/pexels-photo-36771569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
};

export const tasks: Task[] = [
  { id: 't1', title: 'Foundation inspection - Building A', status: 'done', priority: 'high', assignee: 'David Kim', projectId: 'p1', dueDate: '2024-01-15', description: 'Complete foundation inspection for Building A before concrete pour', category: 'Inspection' },
  { id: 't2', title: 'Steel delivery coordination', status: 'in_progress', priority: 'urgent', assignee: 'Mike Rodriguez', projectId: 'p1', dueDate: '2024-01-20', description: 'Coordinate with steel supplier for floors 15-20 delivery schedule', category: 'Procurement' },
  { id: 't3', title: 'Electrical rough-in - Floors 8-12', status: 'in_progress', priority: 'high', assignee: 'James Wilson', projectId: 'p1', dueDate: '2024-02-01', description: 'Complete electrical rough-in work for floors 8 through 12', category: 'Electrical' },
  { id: 't4', title: 'Submit permit application - Phase 2', status: 'todo', priority: 'medium', assignee: 'Sarah Chen', projectId: 'p2', dueDate: '2024-01-25', description: 'Prepare and submit building permit for Phase 2 of residential estate', category: 'Permits' },
  { id: 't5', title: 'HVAC system design review', status: 'review', priority: 'medium', assignee: 'Lisa Thompson', projectId: 'p3', dueDate: '2024-01-28', description: 'Review and approve HVAC system design for station renovation', category: 'Design' },
  { id: 't6', title: 'Parking lot paving - Section C', status: 'in_progress', priority: 'low', assignee: 'David Kim', projectId: 'p4', dueDate: '2024-02-05', description: 'Complete asphalt paving for parking section C', category: 'Site Work' },
  { id: 't7', title: 'Fire suppression system test', status: 'todo', priority: 'high', assignee: 'James Wilson', projectId: 'p4', dueDate: '2024-02-10', description: 'Conduct full fire suppression system test and certification', category: 'Safety' },
  { id: 't8', title: 'Landscape design approval', status: 'todo', priority: 'low', assignee: 'Lisa Thompson', projectId: 'p2', dueDate: '2024-02-15', description: 'Get client approval on final landscape design', category: 'Design' },
  { id: 't9', title: 'Concrete pour - Floor 18', status: 'todo', priority: 'urgent', assignee: 'David Kim', projectId: 'p1', dueDate: '2024-01-22', description: 'Coordinate and execute concrete pour for floor 18', category: 'Concrete' },
  { id: 't10', title: 'Safety audit preparation', status: 'review', priority: 'high', assignee: 'Mike Rodriguez', projectId: 'p1', dueDate: '2024-01-18', description: 'Prepare documentation for upcoming OSHA safety audit', category: 'Safety' },
  { id: 't11', title: 'Plumbing rough-in - Units 12-18', status: 'in_progress', priority: 'medium', assignee: 'Robert Taylor', projectId: 'p2', dueDate: '2024-02-08', description: 'Complete plumbing rough-in for residential units 12-18', category: 'Plumbing' },
  { id: 't12', title: 'Window installation - South facade', status: 'todo', priority: 'medium', assignee: 'James Wilson', projectId: 'p1', dueDate: '2024-02-20', description: 'Install curtain wall windows on south facade floors 5-10', category: 'Facade' },
];

export const dailyLogs: DailyLog[] = [
  { id: 'dl1', projectId: 'p1', date: '2024-01-15', weather: 'Sunny', temperature: '72°F', workersOnSite: 85, hoursWorked: 680, summary: 'Continued steel erection on floors 17-18. Concrete pour completed for floor 16. MEP rough-in ongoing floors 8-12. No safety incidents.', author: 'Mike Rodriguez', safetyIncidents: 0, delaysReported: false },
  { id: 'dl2', projectId: 'p1', date: '2024-01-14', weather: 'Partly Cloudy', temperature: '68°F', workersOnSite: 78, hoursWorked: 624, summary: 'Steel delivery received for floors 17-18. Foundation waterproofing inspection passed. Elevator shaft work continues.', author: 'Mike Rodriguez', safetyIncidents: 0, delaysReported: false },
  { id: 'dl3', projectId: 'p1', date: '2024-01-13', weather: 'Rainy', temperature: '55°F', workersOnSite: 42, hoursWorked: 336, summary: 'Reduced crew due to rain. Interior work continued on floors 5-10. Exterior work suspended.', author: 'David Kim', safetyIncidents: 0, delaysReported: true },
  { id: 'dl4', projectId: 'p2', date: '2024-01-15', weather: 'Sunny', temperature: '74°F', workersOnSite: 35, hoursWorked: 280, summary: 'Framing completed for units 15-18. Roofing started on units 1-6. Landscaping grading in progress.', author: 'Lisa Thompson', safetyIncidents: 0, delaysReported: false },
  { id: 'dl5', projectId: 'p4', date: '2024-01-15', weather: 'Sunny', temperature: '71°F', workersOnSite: 55, hoursWorked: 440, summary: 'Interior finishing ongoing in anchor tenant spaces. Parking lot Section B paving completed. Signage installation started.', author: 'Lisa Thompson', safetyIncidents: 1, delaysReported: false },
];

export const documents: Document[] = [
  { id: 'd1', name: 'Architectural Plans - Building A.dwg', type: 'drawing', projectId: 'p1', uploadedBy: 'Sarah Chen', uploadedAt: '2024-01-10', size: '45 MB', version: 3, status: 'current' },
  { id: 'd2', name: 'Structural Engineering Report.pdf', type: 'spec', projectId: 'p1', uploadedBy: 'Mike Rodriguez', uploadedAt: '2024-01-08', size: '12 MB', version: 2, status: 'current' },
  { id: 'd3', name: 'General Contract - Riverside Tower.pdf', type: 'contract', projectId: 'p1', uploadedBy: 'John Mitchell', uploadedAt: '2023-02-15', size: '8 MB', version: 1, status: 'current' },
  { id: 'd4', name: 'Site Photos - Jan 15.zip', type: 'photo', projectId: 'p1', uploadedBy: 'David Kim', uploadedAt: '2024-01-15', size: '156 MB', version: 1, status: 'current' },
  { id: 'd5', name: 'MEP Specifications.pdf', type: 'spec', projectId: 'p1', uploadedBy: 'Lisa Thompson', uploadedAt: '2024-01-05', size: '28 MB', version: 4, status: 'current' },
  { id: 'd6', name: 'Building Permit - Phase 1.pdf', type: 'permit', projectId: 'p2', uploadedBy: 'Sarah Chen', uploadedAt: '2023-08-01', size: '3 MB', version: 1, status: 'current' },
  { id: 'd7', name: 'Floor Plans - Units 1-12.dwg', type: 'drawing', projectId: 'p2', uploadedBy: 'Lisa Thompson', uploadedAt: '2023-09-20', size: '67 MB', version: 5, status: 'current' },
  { id: 'd8', name: 'Environmental Impact Assessment.pdf', type: 'report', projectId: 'p5', uploadedBy: 'Mike Rodriguez', uploadedAt: '2023-12-01', size: '15 MB', version: 1, status: 'draft' },
  { id: 'd9', name: 'Monthly Progress Report - Dec.pdf', type: 'report', projectId: 'p1', uploadedBy: 'Mike Rodriguez', uploadedAt: '2024-01-02', size: '5 MB', version: 1, status: 'current' },
  { id: 'd10', name: 'Landscape Design Plans.dwg', type: 'drawing', projectId: 'p2', uploadedBy: 'Lisa Thompson', uploadedAt: '2024-01-12', size: '34 MB', version: 2, status: 'current' },
];

export const rfis: RFI[] = [
  { id: 'rfi1', number: 'RFI-001', subject: 'Clarification on Column Grid Layout - Level 15', projectId: 'p1', status: 'open', priority: 'high', submittedBy: 'David Kim', assignedTo: 'Sarah Chen', submittedDate: '2024-01-14', dueDate: '2024-01-21', description: 'Need clarification on column grid alignment at Level 15 where structural drawings conflict with architectural plans.' },
  { id: 'rfi2', number: 'RFI-002', subject: 'HVAC Duct Routing - Floors 8-10', projectId: 'p1', status: 'answered', priority: 'medium', submittedBy: 'James Wilson', assignedTo: 'Lisa Thompson', submittedDate: '2024-01-10', dueDate: '2024-01-17', description: 'HVAC duct routing conflicts with structural beams on floors 8-10. Request alternative routing suggestions.' },
  { id: 'rfi3', number: 'RFI-003', subject: 'Exterior Cladding Material Substitution', projectId: 'p1', status: 'open', priority: 'medium', submittedBy: 'Mike Rodriguez', assignedTo: 'Sarah Chen', submittedDate: '2024-01-13', dueDate: '2024-01-27', description: 'Specified exterior cladding material has 16-week lead time. Requesting approval for equivalent substitution.' },
  { id: 'rfi4', number: 'RFI-004', subject: 'Foundation Depth Adjustment - Unit 20', projectId: 'p2', status: 'closed', priority: 'high', submittedBy: 'David Kim', assignedTo: 'Mike Rodriguez', submittedDate: '2024-01-05', dueDate: '2024-01-12', description: 'Soil conditions at Unit 20 require deeper foundation. Request approval for additional 2ft depth.' },
  { id: 'rfi5', number: 'RFI-005', subject: 'Fire Rating Requirements - Anchor Space', projectId: 'p4', status: 'open', priority: 'urgent', submittedBy: 'James Wilson', assignedTo: 'Lisa Thompson', submittedDate: '2024-01-15', dueDate: '2024-01-18', description: 'Code review indicates higher fire rating requirement for anchor tenant space. Need confirmation on wall assembly specification.' },
];

export const changeOrders: ChangeOrder[] = [
  { id: 'co1', number: 'CO-001', title: 'Additional Elevator Shaft Waterproofing', projectId: 'p1', status: 'approved', amount: 125000, submittedBy: 'Mike Rodriguez', submittedDate: '2024-01-08', description: 'Additional waterproofing membrane required for elevator shafts due to high water table conditions.', reason: 'Unforeseen Conditions' },
  { id: 'co2', number: 'CO-002', title: 'Upgraded Lobby Finishes', projectId: 'p1', status: 'submitted', amount: 340000, submittedBy: 'Lisa Thompson', submittedDate: '2024-01-12', description: 'Client requests upgrade to marble flooring and custom millwork in main lobby.', reason: 'Client Request' },
  { id: 'co3', number: 'CO-003', title: 'Additional Parking Level', projectId: 'p1', status: 'draft', amount: 2800000, submittedBy: 'Mike Rodriguez', submittedDate: '2024-01-15', description: 'Addition of one underground parking level to accommodate increased demand.', reason: 'Scope Change' },
  { id: 'co4', number: 'CO-004', title: 'Solar Panel Installation', projectId: 'p2', status: 'approved', amount: 450000, submittedBy: 'Lisa Thompson', submittedDate: '2023-12-20', description: 'Installation of solar panels on all residential units per updated green building requirements.', reason: 'Regulatory Change' },
  { id: 'co5', number: 'CO-005', title: 'Food Court Expansion', projectId: 'p4', status: 'rejected', amount: 890000, submittedBy: 'Lisa Thompson', submittedDate: '2024-01-03', description: 'Expand food court area by 3,000 sq ft to accommodate additional vendors.', reason: 'Client Request' },
];

export const subcontractors: Subcontractor[] = [
  { id: 's1', company: 'Apex Electrical Services', trade: 'Electrical', contact: 'Tom Baker', email: 'tom@apexelectric.com', phone: '(555) 111-2222', status: 'active', rating: 4.8, projectsCompleted: 15, insuranceExpiry: '2024-12-31', licenseNumber: 'EL-2024-4567' },
  { id: 's2', company: 'Pacific Plumbing Co', trade: 'Plumbing', contact: 'Maria Santos', email: 'maria@pacificplumbing.com', phone: '(555) 222-3333', status: 'active', rating: 4.5, projectsCompleted: 22, insuranceExpiry: '2024-09-30', licenseNumber: 'PL-2024-7890' },
  { id: 's3', company: 'SteelForce Fabrication', trade: 'Structural Steel', contact: 'Ryan O\'Brien', email: 'ryan@steelforce.com', phone: '(555) 333-4444', status: 'active', rating: 4.9, projectsCompleted: 8, insuranceExpiry: '2025-03-15', licenseNumber: 'ST-2024-1234' },
  { id: 's4', company: 'CoolAir HVAC Solutions', trade: 'HVAC', contact: 'Jennifer Lee', email: 'jennifer@coolair.com', phone: '(555) 444-5555', status: 'active', rating: 4.3, projectsCompleted: 18, insuranceExpiry: '2024-11-30', licenseNumber: 'HV-2024-5678' },
  { id: 's5', company: 'GreenScape Landscaping', trade: 'Landscaping', contact: 'Carlos Rivera', email: 'carlos@greenscape.com', phone: '(555) 555-6666', status: 'prequalified', rating: 4.6, projectsCompleted: 30, insuranceExpiry: '2024-08-15', licenseNumber: 'LS-2024-9012' },
  { id: 's6', company: 'FireGuard Systems', trade: 'Fire Protection', contact: 'Susan Park', email: 'susan@fireguard.com', phone: '(555) 666-7777', status: 'active', rating: 4.7, projectsCompleted: 12, insuranceExpiry: '2025-01-31', licenseNumber: 'FP-2024-3456' },
  { id: 's7', company: 'Elite Concrete Works', trade: 'Concrete', contact: 'Frank Morrison', email: 'frank@eliteconcrete.com', phone: '(555) 777-8888', status: 'active', rating: 4.4, projectsCompleted: 25, insuranceExpiry: '2024-10-31', licenseNumber: 'CO-2024-6789' },
  { id: 's8', company: 'ProPaint Commercial', trade: 'Painting', contact: 'Angela White', email: 'angela@propaint.com', phone: '(555) 888-9999', status: 'inactive', rating: 3.9, projectsCompleted: 40, insuranceExpiry: '2024-02-28', licenseNumber: 'PA-2024-0123' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'warning', message: 'RFI-005 requires urgent response by Jan 18', timestamp: '5 min ago', read: false, link: 'rfis' },
  { id: 'n2', type: 'success', message: 'Change Order CO-001 has been approved', timestamp: '1 hour ago', read: false, link: 'change-orders' },
  { id: 'n3', type: 'info', message: 'New daily log submitted for Riverside Tower', timestamp: '2 hours ago', read: false, link: 'daily-logs' },
  { id: 'n4', type: 'error', message: 'Insurance expiry alert: ProPaint Commercial expires Feb 28', timestamp: '3 hours ago', read: true, link: 'subcontractors' },
  { id: 'n5', type: 'info', message: 'Carlos Mendez accepted team invitation', timestamp: '5 hours ago', read: true, link: 'team' },
  { id: 'n6', type: 'warning', message: 'Greenfield Shopping Center is 72% complete - behind schedule', timestamp: '1 day ago', read: true, link: 'projects' },
  { id: 'n7', type: 'success', message: 'Monthly progress report uploaded successfully', timestamp: '1 day ago', read: true, link: 'documents' },
  { id: 'n8', type: 'info', message: 'Task "Safety audit preparation" moved to review', timestamp: '2 days ago', read: true, link: 'tasks' },
];

export const auditLogs: AuditLog[] = [
  { id: 'al1', action: 'User Login', user: 'John Mitchell', timestamp: '2024-01-15 09:00:23', details: 'Successful login from Chrome/Windows', ip: '192.168.1.100' },
  { id: 'al2', action: 'Document Upload', user: 'David Kim', timestamp: '2024-01-15 08:45:12', details: 'Uploaded "Site Photos - Jan 15.zip" to Riverside Tower', ip: '192.168.1.105' },
  { id: 'al3', action: 'Change Order Created', user: 'Mike Rodriguez', timestamp: '2024-01-15 08:30:00', details: 'Created CO-003: Additional Parking Level', ip: '192.168.1.102' },
  { id: 'al4', action: 'User Invited', user: 'Sarah Chen', timestamp: '2024-01-14 16:20:45', details: 'Invited Carlos Mendez as Field Worker', ip: '192.168.1.101' },
  { id: 'al5', action: 'Permission Changed', user: 'John Mitchell', timestamp: '2024-01-14 14:15:30', details: 'Updated Patricia Hughes role to Admin', ip: '192.168.1.100' },
  { id: 'al6', action: 'Project Updated', user: 'Lisa Thompson', timestamp: '2024-01-14 11:00:00', details: 'Updated Oakwood Residential progress to 45%', ip: '192.168.1.103' },
  { id: 'al7', action: 'RFI Submitted', user: 'David Kim', timestamp: '2024-01-14 10:30:00', details: 'Submitted RFI-001 for Riverside Tower', ip: '192.168.1.105' },
  { id: 'al8', action: 'Subscription Updated', user: 'John Mitchell', timestamp: '2024-01-13 09:00:00', details: 'Upgraded plan from Professional to Enterprise', ip: '192.168.1.100' },
];

export const milestones: Milestone[] = [
  { id: 'm1', name: 'Foundation Complete', projectId: 'p1', dueDate: '2023-09-30', status: 'completed', description: 'All foundation work including piling, footings, and waterproofing' },
  { id: 'm2', name: 'Structure Topping Out', projectId: 'p1', dueDate: '2024-06-30', status: 'upcoming', description: 'Completion of structural frame to full height' },
  { id: 'm3', name: 'Envelope Complete', projectId: 'p1', dueDate: '2024-12-31', status: 'upcoming', description: 'Building envelope including curtain wall, roofing, and waterproofing' },
  { id: 'm4', name: 'Substantial Completion', projectId: 'p1', dueDate: '2025-04-30', status: 'upcoming', description: 'Project substantially complete and ready for occupancy' },
  { id: 'm5', name: 'Phase 1 Units Complete', projectId: 'p2', dueDate: '2024-06-30', status: 'upcoming', description: 'Units 1-12 complete with finishes and landscaping' },
  { id: 'm6', name: 'Grand Opening Ready', projectId: 'p4', dueDate: '2024-08-31', status: 'upcoming', description: 'Shopping center ready for grand opening event' },
  { id: 'm7', name: 'Environmental Clearance', projectId: 'p5', dueDate: '2024-03-31', status: 'overdue', description: 'Environmental impact assessment approval' },
];

export const budgetItems: BudgetItem[] = [
  { id: 'b1', projectId: 'p1', category: 'Site Work', budgeted: 3200000, actual: 3100000, committed: 3200000, variance: 100000 },
  { id: 'b2', projectId: 'p1', category: 'Concrete', budgeted: 6500000, actual: 5800000, committed: 6200000, variance: 300000 },
  { id: 'b3', projectId: 'p1', category: 'Structural Steel', budgeted: 8900000, actual: 7200000, committed: 8500000, variance: 400000 },
  { id: 'b4', projectId: 'p1', category: 'Mechanical', budgeted: 5400000, actual: 3100000, committed: 5200000, variance: 200000 },
  { id: 'b5', projectId: 'p1', category: 'Electrical', budgeted: 4200000, actual: 2400000, committed: 4000000, variance: 200000 },
  { id: 'b6', projectId: 'p1', category: 'Plumbing', budgeted: 3100000, actual: 1800000, committed: 3000000, variance: 100000 },
  { id: 'b7', projectId: 'p1', category: 'Facade/Cladding', budgeted: 4800000, actual: 1200000, committed: 4500000, variance: 300000 },
  { id: 'b8', projectId: 'p1', category: 'Interior Finishes', budgeted: 5200000, actual: 800000, committed: 5000000, variance: 200000 },
  { id: 'b9', projectId: 'p1', category: 'Elevator Systems', budgeted: 2200000, actual: 1100000, committed: 2200000, variance: 0 },
  { id: 'b10', projectId: 'p1', category: 'General Conditions', budgeted: 1500000, actual: 1000000, committed: 1500000, variance: 0 },
];

export const comments: Comment[] = [
  { id: 'cm1', author: 'Mike Rodriguez', avatar: 'MR', content: 'Steel delivery confirmed for next Monday. @David Kim please ensure crane is available for unloading.', timestamp: '2 hours ago', mentions: ['David Kim'] },
  { id: 'cm2', author: 'David Kim', avatar: 'DK', content: 'Crane is scheduled and ready. Will have the rigging crew on standby from 7 AM.', timestamp: '1 hour ago', mentions: [] },
  { id: 'cm3', author: 'Sarah Chen', avatar: 'SC', content: 'Updated architectural plans uploaded. @Lisa Thompson please review the lobby changes before EOD.', timestamp: '3 hours ago', mentions: ['Lisa Thompson'] },
  { id: 'cm4', author: 'Lisa Thompson', avatar: 'LT', content: 'Reviewed and approved. The new layout looks great. Moving forward with procurement.', timestamp: '30 min ago', mentions: [] },
  { id: 'cm5', author: 'John Mitchell', avatar: 'JM', content: 'Great progress team! Let\'s discuss the schedule adjustments in tomorrow\'s standup.', timestamp: '15 min ago', mentions: [] },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  { id: 'sp1', name: 'Starter', price: 49, interval: 'monthly', features: ['Up to 5 users', '3 active projects', '10 GB storage', 'Basic reporting', 'Email support', 'Daily logs', 'Document uploads'], maxUsers: 5, maxProjects: 3, storage: '10 GB' },
  { id: 'sp2', name: 'Professional', price: 149, interval: 'monthly', features: ['Up to 25 users', '15 active projects', '100 GB storage', 'Advanced reporting', 'Priority support', 'RFI management', 'Change orders', 'Budget tracking', 'Subcontractor portal', 'API access'], maxUsers: 25, maxProjects: 15, storage: '100 GB', recommended: true },
  { id: 'sp3', name: 'Enterprise', price: 399, interval: 'monthly', features: ['Unlimited users', 'Unlimited projects', '1 TB storage', 'Custom reporting', '24/7 phone support', 'All features included', 'Custom integrations', 'SSO/SAML', 'Dedicated account manager', 'SLA guarantee', 'On-premise option', 'Audit logs'], maxUsers: 999, maxProjects: 999, storage: '1 TB' },
];

export const chartData = {
  monthlySpend: [
    { month: 'Jul', amount: 2100000 }, { month: 'Aug', amount: 2800000 }, { month: 'Sep', amount: 3200000 },
    { month: 'Oct', amount: 2900000 }, { month: 'Nov', amount: 3500000 }, { month: 'Dec', amount: 3100000 },
    { month: 'Jan', amount: 2700000 },
  ],
  projectProgress: [
    { name: 'Riverside Tower', progress: 63 }, { name: 'Oakwood Estate', progress: 45 },
    { name: 'Metro Station', progress: 5 }, { name: 'Greenfield Mall', progress: 72 },
    { name: 'Harbor Bridge', progress: 15 },
  ],
  tasksByStatus: [
    { name: 'To Do', value: 5, color: '#94a3b8' }, { name: 'In Progress', value: 4, color: '#3b82f6' },
    { name: 'Review', value: 2, color: '#f59e0b' }, { name: 'Done', value: 1, color: '#22c55e' },
  ],
  weeklyHours: [
    { day: 'Mon', hours: 720 }, { day: 'Tue', hours: 685 }, { day: 'Wed', hours: 710 },
    { day: 'Thu', hours: 695 }, { day: 'Fri', hours: 680 }, { day: 'Sat', hours: 340 },
  ],
};
