# Teams Management Feature - Complete Implementation

Create a complete Teams management feature for the IntelliOps application following ALL patterns and skills documented in CLAUDE.md.

---

## Overview

Build a comprehensive team management system that allows users to:
- View all teams in table/list/card views
- Create teams using template selector wizard
- Edit team details and settings
- Delete teams with inline confirmation
- Manage team members (add, remove, edit roles)
- Configure team-specific settings
- Access teams quickly via left menu drawer with recent items

---

## CRITICAL: Skills to Use

### 1. entity-list-actions Skill
**WHEN:** Creating the TeamList page header
**USAGE:** Invoke the skill to generate PageLayout header with search functionality and action buttons

```
Use entity-list-actions skill for:
- Search input in header with proper state management
- "New Team" button that navigates to /teams/create
- Proper PageLayout integration with search + actions
```

### 2. react-hook-form Skill
**WHEN:** Creating ANY form (TeamFormPanel, MemberFormPanel, wizard steps)
**USAGE:** Invoke the skill to generate forms with proper validation

```
Use react-hook-form skill for:
- TeamFormPanel (create/edit team basic info)
- MemberFormPanel (add/edit team members)
- TeamBasicInfo wizard step component
- All forms MUST use react-hook-form, NEVER useState for form data
- Include proper validation with error messages
- Use Zod schemas for type-safe validation
```

### 3. entity-template-selector Skill
**WHEN:** Creating the team creation wizard
**USAGE:** Invoke the skill to generate template selection UI

```
Use entity-template-selector skill for:
- CreateTeamWizard with EntityTemplateSelector component
- Template options: "Development Team", "Product Team", "Operations Team", "Custom Team"
- Each template should have different icon and description
- Multi-step wizard with FormProvider and StepWizard
- Template-based step generation
```

---

## Implementation Requirements

### 1. List Page (TeamList.tsx)

**MUST USE entity-list-actions skill for header**

Components:
- PageLayout with search + "New Team" button (via skill)
- GenericTableListCardView with table/list/card modes
- TeamListView (list component)
- TeamCard (card component using GenericCard)

Columns (CRITICAL PATTERNS):
- **Name** - text, sortable
- **UID** - MUST use `CopyableLabel` component
- **Members** - text with count
- **Status** - MUST use `StatusBadge` component
- **Last Updated** - MUST use `formatTimeAgo` function

Actions:
- View (default action, navigates to detail)
- Edit (opens TeamFormPanel)
- Delete (MUST use InlineConfirmation, NOT requiresConfirmation)

Mock Data:
- 5 sample teams with realistic data
- USE_MOCK_DATA flag set to true
- Mock data includes: Engineering, Product Management, DevOps, Design, QA teams

### 2. Create Team Wizard

**MUST USE entity-template-selector skill**

Files:
- `CreateTeam.tsx` - Route wrapper component
- `CreateTeamWizard/CreateTeamWizard.tsx` - Main wizard logic
- `CreateTeamWizard/schemas/team-form-schema.ts` - Zod validation schema
- `CreateTeamWizard/steps/TeamBasicInfo.tsx` - First step component

Templates (via EntityTemplateSelector):
```typescript
Templates should include:
1. Development Team
   - Icon: Code
   - Description: "For software development teams with engineering workflow"
   - Key Features: ["Sprint planning", "Code reviews", "Agile workflow"]

2. Product Team
   - Icon: Package
   - Description: "For product management and strategy teams"
   - Key Features: ["Product roadmap", "Feature prioritization", "User feedback"]

3. Operations Team
   - Icon: Settings
   - Description: "For DevOps and infrastructure teams"
   - Key Features: ["Deployment tracking", "Incident management", "On-call rotation"]

4. Custom Team
   - Icon: Users
   - Description: "Create a custom team with flexible configuration"
   - Key Features: ["Flexible structure", "Custom workflows", "Adaptable roles"]
```

Wizard Pattern:
- Show EntityTemplateSelector first
- Build wizard steps from selected template
- Use FormProvider + StepWizard pattern
- Steps: Basic Info → Configuration (if applicable) → Review
- Completion screen with success message
- Navigate to created team or back to list

### 3. Team Form Panel

**MUST USE react-hook-form skill**

Component: `TeamFormPanel.tsx`

Form Fields:
- Team Name (required, Input)
- Description (required, Textarea, 4 rows)
- Status (required, select: active/inactive)

Validation:
- Use Zod schema with zodResolver
- Show validation errors below each field
- Disable submit when form is invalid or submitting

Panel Integration:
- Use GenericPanel component
- Show in ContentLayout side panel
- Panel width: "md"
- Submit button text: "Create" or "Update"

### 4. Detail Page (TeamHome.tsx)

Structure:
- PageLayout wrapper
- EntityHome with segments
- Entity type: EntityTypes.Team

Segments:
```typescript
[
  {
    label: 'Overview',
    key: 'overview',
    segmentPath: 'overview',
    icon: SegmentIcon.OVERVIEW,
    component: TeamOverview,
    isDefault: true,
  },
  {
    label: 'Members',
    key: 'members',
    segmentPath: 'members',
    icon: LucideIcon.Users,
    component: TeamMembers,
  },
  {
    label: 'Settings',
    key: 'settings',
    segmentPath: 'settings',
    icon: GeneralIcon.SETTINGS,
    component: TeamSettings,
  },
]
```

### 5. Overview Segment (TeamOverview.tsx)

Layout:
- Simple div with padding: `<div className="p-6">`
- NO ContentLayout (overview is simple content)

Content Sections:
1. **Team Information Card** (using GenericCard)
   - Display team name, description, status
   - Owner information
   - Created/updated dates

2. **Metrics Grid** (using GenericCard variant="metric")
   - Total Members
   - Active Members
   - Admin Count
   - Recent Activity Count

3. **Recent Activity** (using GenericCard)
   - List of recent team activities
   - Member additions, role changes, etc.

### 6. Members Segment (TeamMembers.tsx)

**MUST USE react-hook-form skill for MemberFormPanel**

Layout:
- ContentLayout with panel
- MemberFormPanel in side panel
- GenericTableListCardView for member list

Columns:
- Name (text, sortable)
- Email (text)
- Role (custom render with role label)
- Status (StatusBadge)
- Joined (formatTimeAgo)
- Last Active (formatTimeAgo)

Actions:
- Edit Role (opens MemberFormPanel)
- Remove (MUST use InlineConfirmation)

Member Form Panel:
- Use react-hook-form with Zod validation
- Fields: Name, Email, User ID (for new members), Role (select)
- Role options: Owner, Admin, Member, Viewer
- Show role descriptions
- Disable name/email when editing (only role can change)

### 7. Settings Segment (TeamSettings.tsx)

**CRITICAL:** Use EntitySettings component

```typescript
import { EntitySettings } from '@components/Settings/EntitySettings/EntitySettings';
import { EntityTypes } from '@intelliops/types';

const TeamSettings = () => {
  const { entityUId } = useParams();

  return (
    <EntitySettings
      entityType={EntityTypes.Team}
      entityUId={entityUId!}
      onUpdate={() => {}}
      saveSetting={async (path, value) => {
        // Save logic
      }}
    />
  );
};
```

### 8. TypeScript Types (team-types.ts)

```typescript
export interface Team {
  id: number;
  uid: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  memberCount: number;
  createdAt: Date;
  lastUpdated: Date;
  owner?: TeamMember;
  ownerUId?: string;
}

export interface TeamMember {
  id: number;
  uid: string;
  teamUId: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: TeamMemberRole;
  status: 'active' | 'invited' | 'inactive';
  joinedAt: Date;
  lastActive?: Date;
  avatar?: string;
}

export enum TeamMemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

export interface CreateTeamDto {
  name: string;
  description: string;
  status?: 'active' | 'inactive';
  templateId?: string;
}

export interface UpdateTeamDto {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface AddTeamMemberDto {
  userId: string;
  userName: string;
  userEmail: string;
  role: TeamMemberRole;
}

export interface UpdateTeamMemberDto {
  role?: TeamMemberRole;
  status?: 'active' | 'inactive';
}

export interface DeleteTeamDto {
  teamUIds: string[];
}

export interface BulkDeleteTeamResponse {
  deleted: number;
  failed: string[];
}

export interface TeamDetailsDto extends Team {
  members: TeamMember[];
}

export interface TeamDashboardData {
  totalMembers: number;
  activeMembers: number;
  recentActivity: TeamActivity[];
  membersByRole: { role: string; count: number }[];
}

export interface TeamActivity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  actor: string;
}
```

### 9. Query Hooks (team-query.ts)

**Mock Data Requirements:**
- USE_MOCK_DATA flag set to true
- 5 sample teams
- 5 sample team members for team-001
- Helper function: `simulateDelay(data, 500)`

Query Hooks:
- `useGetTeamList()` - Get all teams
- `useGetRecentTeams()` - Get recent 5 teams (for drawer)
- `useGetTeamById(teamUId)` - Get single team
- `useGetTeamDetails(teamUId)` - Get team with members
- `useGetTeamMembers(teamUId)` - Get team members
- `useGetTeamDashboard(teamUId)` - Get dashboard data

Mutation Hooks:
- `useCreateTeam()` - Create team
- `useCreateTeamFromTemplate()` - Create from template
- `useUpdateTeam()` - Update team
- `useDeleteTeams()` - Bulk delete teams
- `useAddTeamMember()` - Add member to team
- `useUpdateTeamMember()` - Update member role
- `useRemoveTeamMember()` - Remove member from team

All mutations should:
- Invalidate relevant queries on success
- Update mock data arrays
- Return simulated delays

### 10. Zustand Store (useTeamStore.ts)

```typescript
interface TeamStoreState {
  // Selected entities
  selectedTeam: Team | null;
  selectedMember: TeamMember | null;

  // Panel states
  isTeamPanelOpen: boolean;
  isMemberPanelOpen: boolean;

  // Loading states
  isLoading: boolean;

  // Actions
  setSelectedTeam: (team: Team | null) => void;
  setSelectedMember: (member: TeamMember | null) => void;
  openTeamPanel: (team?: Team) => void;
  closeTeamPanel: () => void;
  openMemberPanel: (member?: TeamMember) => void;
  closeMemberPanel: () => void;
  reset: () => void;
}
```

### 11. Routes Configuration

Update `Routes.tsx`:
```typescript
import { TeamList, TeamHome, CreateTeam } from "./pages/Teams";

const teamRoutes = () => (
  <>
    <Route path="/teams" element={<TeamList />} />
    <Route path="/teams/create" element={<CreateTeam />} />
    {createRoutesWithConversation(
      "/teams/:entityUId",
      <TeamHome />,
      TeamSubPaths
    )}
  </>
);
```

Update `constants.ts`:
```typescript
export const TeamSubPaths = ['overview', 'members', 'settings'];
```

### 12. Left Menu Integration

**CRITICAL:** Add drawer support for Teams

Update `LeftMenu.tsx`:
1. Import `useGetRecentTeams` from team-query
2. Add to hook calls: `const getRecentTeams = useGetRecentTeams();`
3. Add drawer case in `renderDynamicDrawer`:
```typescript
case DrawerMenu.Teams:
  getDrawerData = getRecentTeams;
  listPath = "teams";
  createPath = "teams/create";
  loadingText = getRecentTeams?.isLoading ? "Loading Teams..." : "";
  tabs = [
    {
      key: "recentlyCreated",
      value: "Recently Created",
      icon: <Icon name={LucideIcon.ArrowDown} />,
      emptyState: {
        message: "No recently created Teams",
        icon: LucideIcon.Users,
        action: renderCreateItemButton(createPath, "Team"),
      },
    },
    {
      key: "recentlyAccessed",
      value: "Recently Accessed",
      icon: <Icon name={LucideIcon.ArrowLeftRight} />,
      emptyState: {
        message: "No recently accessed Teams",
        icon: LucideIcon.Users,
        action: renderGoToListViewButton(listPath),
      },
    },
  ];
  break;
```
4. Change menu item type from "Link" to "Drawer":
```typescript
{renderDrawerMenuItem(
  DrawerMenu.Teams,
  "Teams",
  LucideIcon.Users,
  false,
  isCollapsed,
  "Drawer",  // Changed from "Link"
)}
```

### 13. Entity Type Enum

Update `entity.type.ts`:
```typescript
export enum EntityTypes {
  // ... existing types
  Team = "team",
}
```

---

## File Structure

```
src/
├── pages/
│   └── Teams/
│       ├── index.ts
│       ├── TeamList.tsx (use entity-list-actions skill)
│       ├── TeamHome.tsx
│       ├── CreateTeam.tsx
│       ├── CreateTeamWizard/
│       │   ├── CreateTeamWizard.tsx (use entity-template-selector skill)
│       │   ├── schemas/
│       │   │   └── team-form-schema.ts
│       │   └── steps/
│       │       └── TeamBasicInfo.tsx (use react-hook-form skill)
│       ├── components/
│       │   ├── TeamListView.tsx
│       │   ├── TeamCard.tsx (use GenericCard)
│       │   ├── TeamFormPanel.tsx (use react-hook-form skill)
│       │   ├── MemberFormPanel.tsx (use react-hook-form skill)
│       │   ├── TeamMemberListView.tsx
│       │   └── TeamMemberCard.tsx (use GenericCard)
│       ├── segments/
│       │   ├── TeamOverview.tsx
│       │   ├── TeamMembers.tsx (use react-hook-form for panel)
│       │   └── TeamSettings.tsx (use EntitySettings)
│       └── store/
│           └── useTeamStore.ts
├── query/
│   └── team-query.ts (mock data with USE_MOCK_DATA)
└── types/
    └── team-types.ts
```

---

## Mandatory Patterns Checklist

- [ ] **entity-list-actions skill** used for TeamList header with search
- [ ] **react-hook-form skill** used for ALL forms (TeamFormPanel, MemberFormPanel, wizard steps)
- [ ] **entity-template-selector skill** used for team creation wizard
- [ ] InlineConfirmation for ALL delete actions (no requiresConfirmation)
- [ ] GenericCard for ALL card components (TeamCard, TeamMemberCard, metrics)
- [ ] CopyableLabel for UID columns
- [ ] StatusBadge for status columns
- [ ] formatTimeAgo for date/time columns
- [ ] ContentLayout + GenericPanel for forms
- [ ] EntitySettings for settings segment
- [ ] USE_MOCK_DATA flag set to true
- [ ] Mock data with 5 teams and realistic member data
- [ ] Drawer support in left menu (not Link)
- [ ] createRoutesWithConversation for routes
- [ ] EntityTypes.Team enum added
- [ ] Query invalidation on mutations
- [ ] Zustand store for panel state
- [ ] COLUMN_WIDTHS for list view spacing
- [ ] Hover actions on cards
- [ ] Action buttons on list items

---

## Implementation Order

1. **Generate types** (team-types.ts) - Foundation
2. **Generate query hooks** (team-query.ts) with mock data
3. **Generate Zustand store** (useTeamStore.ts)
4. **USE entity-list-actions skill** → Generate TeamList with search header
5. **Generate list/card components** (TeamListView, TeamCard with GenericCard)
6. **USE react-hook-form skill** → Generate TeamFormPanel
7. **USE entity-template-selector skill** → Generate CreateTeamWizard
8. **USE react-hook-form skill** → Generate TeamBasicInfo step
9. **Generate detail page** (TeamHome with EntityHome)
10. **Generate overview segment** (TeamOverview with metrics)
11. **USE react-hook-form skill** → Generate MemberFormPanel
12. **Generate members segment** (TeamMembers with ContentLayout)
13. **Generate member list/card** (TeamMemberListView, TeamMemberCard)
14. **Generate settings segment** (TeamSettings with EntitySettings)
15. **Update routes** (Routes.tsx, constants.ts)
16. **Update entity types** (entity.type.ts)
17. **Update left menu** (LeftMenu.tsx with drawer)
18. **Test all flows** (create, edit, delete, member management)

---

## Success Criteria

✅ All three skills invoked correctly (entity-list-actions, react-hook-form, entity-template-selector)
✅ Search functionality in list page header
✅ Template selector wizard for team creation
✅ All forms use react-hook-form with Zod validation
✅ InlineConfirmation for all delete actions
✅ Drawer opens from left menu showing recent teams
✅ All mandatory column patterns used (CopyableLabel, StatusBadge, formatTimeAgo)
✅ GenericCard used for all cards
✅ EntitySettings used for settings segment
✅ Mock data works with USE_MOCK_DATA flag
✅ No compilation errors
✅ All patterns from CLAUDE.md followed
