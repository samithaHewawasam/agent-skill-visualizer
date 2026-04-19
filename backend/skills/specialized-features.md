# Specialized Features - IntelliOps

This document covers specialized features including React Flow integration and the Interactive Flow System.

---

## Table of Contents

- [React Flow (FeaturesView)](#react-flow-featuresview)
- [Interactive Flow System](#interactive-flow-system)
- [Best Practices](#best-practices)

---

## React Flow (FeaturesView)

React Flow is used for visual graph representations of features and their relationships. See `src/pages/Product/ProductDesign/FeaturesView.tsx` for reference implementation.

### Installation

React Flow should already be installed. If not:

```bash
npm install @xyflow/react
```

### Basic Setup

```tsx
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
```

### Node Types

Define custom node types for your graph:

```tsx
import { FeatureNode } from './components/FeatureNode';
import { AddFeatureNode } from './components/AddFeatureNode';

const nodeTypes = {
  featureNode: FeatureNode,
  addFeatureNode: AddFeatureNode,
};
```

### Node Data Structure

Standard node data interface:

```tsx
interface NodeData {
  id: string;
  label: string;
  description?: string;
  type: 'product' | 'feature' | 'subfeature';
  hasChildren: boolean;
  childCount: number;
  isSelected: boolean;
  isExpanded?: boolean;
  onClick: () => void;
  onToggleExpand?: () => void;
}
```

### Complete Example

```tsx
import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ContentLayout } from 'layouts/ContentLayout';
import { GenericPanel } from '@components/Panel/GenericPanel';
import { FeatureNode } from './components/FeatureNode';
import { AddFeatureNode } from './components/AddFeatureNode';
import { Package } from 'lucide-react';

const nodeTypes = {
  featureNode: FeatureNode,
  addFeatureNode: AddFeatureNode,
};

export const FeaturesView = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Initialize nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (feature) => {
    setSelectedFeature(feature);
    setIsPanelOpen(true);
  };

  // Transform data to nodes
  const transformedNodes: Node[] = features.map((feature) => ({
    id: feature.id,
    type: 'featureNode',
    position: calculatePosition(feature), // Your positioning logic
    data: {
      id: feature.id,
      label: feature.name,
      description: feature.description,
      type: feature.type,
      hasChildren: feature.children?.length > 0,
      childCount: feature.children?.length || 0,
      isSelected: selectedFeature?.id === feature.id,
      isExpanded: expandedIds.has(feature.id),
      onClick: () => handleNodeClick(feature),
      onToggleExpand: () => toggleExpanded(feature.id),
    },
  }));

  return (
    <ContentLayout
      title="Product Design"
      subtitle="Visual feature hierarchy"
      icon={Package}
      isPanelOpen={isPanelOpen}
      onPanelOpenChange={setIsPanelOpen}
      panelWidth="lg"
      panel={
        selectedFeature && (
          <GenericPanel
            title={selectedFeature.name}
            subtitle="Feature details"
            icon={Package}
            onClose={() => setIsPanelOpen(false)}
          >
            {/* Feature details */}
          </GenericPanel>
        )
      }
    >
      <div className="h-full w-full">
        <ReactFlow
          nodes={transformedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.data.isSelected) return '#3b82f6';
              if (node.data.type === 'product') return '#8b5cf6';
              if (node.data.type === 'feature') return '#06b6d4';
              return '#64748b';
            }}
          />
        </ReactFlow>
      </div>
    </ContentLayout>
  );
};
```

### Custom Node Component

```tsx
// components/FeatureNode.tsx
import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { cn } from '@utils/cn-utils';
import { Package, ChevronDown, ChevronRight } from 'lucide-react';

export const FeatureNode = memo(({ data }: NodeProps) => {
  return (
    <div
      onClick={data.onClick}
      className={cn(
        "relative rounded-lg border-2 bg-elevation-1 p-4 shadow-elevation-md transition-all cursor-pointer",
        data.isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-border hover:border-primary/50"
      )}
    >
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary"
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <Package className="size-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground truncate">
            {data.label}
          </h3>
        </div>
        {data.hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onToggleExpand?.();
            }}
            className="rounded p-1 hover:bg-elevation-2"
          >
            {data.isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        )}
      </div>

      {/* Description */}
      {data.description && (
        <p className="text-xs text-text-secondary line-clamp-2">
          {data.description}
        </p>
      )}

      {/* Child count badge */}
      {data.hasChildren && (
        <div className="mt-2 flex items-center gap-1 text-xs text-text-tertiary">
          <Package className="size-3" />
          <span>{data.childCount} sub-features</span>
        </div>
      )}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary"
      />
    </div>
  );
});

FeatureNode.displayName = 'FeatureNode';
```

### Layout Algorithms

**Hierarchical Layout:**

```tsx
import dagre from 'dagre';

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 250, height: 100 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 125,
        y: nodeWithPosition.y - 50,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};
```

### Edge Styling

```tsx
const edges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#64748b' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b',
    },
  },
];
```

---

## Interactive Flow System

The Interactive Flow System allows the LLM to create multi-step interactive experiences. See `src/components/FloatingChat/types/flow.types.ts` for full definitions.

### What is a Flow?

A flow is a structured, multi-step interaction that guides users through a process. The AI can generate flows dynamically based on user needs.

### Node Types

| Type | Purpose | Example Use |
|------|---------|-------------|
| `action` | Perform an action | "Creating feature..." |
| `decision` | User makes a choice | "Should we include tests?" |
| `input` | User provides text input | "Enter feature name" |
| `select` | User selects option(s) | "Select team members" |
| `confirm` | User confirms/cancels | "Create 3 features?" |
| `progress` | Show progress | "Step 2 of 5" |
| `result` | Show final result | "Feature created!" |
| `branch` | Conditional routing | Route based on answer |

### Basic Flow Structure

```typescript
interface Flow {
  id: string;
  title: string;
  description?: string;
  nodes: FlowNode[];
  startNodeId: string;
}

interface FlowNode {
  id: string;
  type: 'action' | 'decision' | 'input' | 'select' | 'confirm' | 'progress' | 'result' | 'branch';
  title: string;
  description?: string;
  nextNodeId?: string;
  // Type-specific properties
  options?: Option[];        // For select, decision
  defaultValue?: string;     // For input
  multiSelect?: boolean;     // For select
  // ... other properties
}
```

### Using Flows in Components

```tsx
import { FlowContainer } from '@components/FloatingChat/components/Flow';
import { useFlowState } from '@components/FloatingChat/hooks/useFlowState';

const MyComponent = () => {
  const [flow, setFlow] = useState<Flow | null>(null);

  const handleFlowComplete = (results: Record<string, any>) => {
    console.log('Flow completed with results:', results);
    // Process results
  };

  return (
    <div>
      {flow && (
        <FlowContainer
          flowResponse={flow}
          onFlowComplete={handleFlowComplete}
        />
      )}
    </div>
  );
};
```

### useFlowState Hook

Access flow state and controls:

```tsx
import { useFlowState } from '@components/FloatingChat/hooks/useFlowState';

const MyFlowComponent = () => {
  const {
    currentNode,      // Current node in flow
    values,           // Collected values
    startFlow,        // (flow: Flow) => void
    goToNode,         // (nodeId: string) => void
    completeNode,     // (value?: any) => void
    setValue,         // (key: string, value: any) => void
    resetFlow,        // () => void
    cancelFlow,       // () => void
  } = useFlowState();

  return ...;
};
```

### Example Flow: Create Feature

```typescript
const createFeatureFlow: Flow = {
  id: 'create-feature',
  title: 'Create New Feature',
  description: 'Guide to create a new feature',
  startNodeId: 'input-name',
  nodes: [
    {
      id: 'input-name',
      type: 'input',
      title: 'Feature Name',
      description: 'Enter a name for the feature',
      placeholder: 'e.g., User Authentication',
      nextNodeId: 'input-description',
    },
    {
      id: 'input-description',
      type: 'input',
      title: 'Description',
      description: 'Provide a brief description',
      placeholder: 'What does this feature do?',
      multiline: true,
      nextNodeId: 'select-type',
    },
    {
      id: 'select-type',
      type: 'select',
      title: 'Feature Type',
      description: 'Select the type of feature',
      options: [
        { value: 'feature', label: 'Feature', description: 'Top-level feature' },
        { value: 'subfeature', label: 'Sub-feature', description: 'Part of a feature' },
      ],
      nextNodeId: 'confirm',
    },
    {
      id: 'confirm',
      type: 'confirm',
      title: 'Create Feature?',
      description: 'Review and confirm',
      nextNodeId: 'action-create',
    },
    {
      id: 'action-create',
      type: 'action',
      title: 'Creating Feature',
      description: 'Please wait...',
      action: 'createFeature',  // Action to perform
      nextNodeId: 'result',
    },
    {
      id: 'result',
      type: 'result',
      title: 'Feature Created!',
      description: 'Your feature has been created successfully',
      resultType: 'success',
    },
  ],
};
```

### Conditional Flows (Branching)

```typescript
{
  id: 'branch-node',
  type: 'branch',
  title: 'Routing',
  conditions: [
    {
      field: 'needsTests',
      operator: 'equals',
      value: true,
      nextNodeId: 'create-tests',
    },
    {
      field: 'needsTests',
      operator: 'equals',
      value: false,
      nextNodeId: 'skip-tests',
    },
  ],
  defaultNextNodeId: 'skip-tests',
}
```

### Progress Nodes

```typescript
{
  id: 'progress-1',
  type: 'progress',
  title: 'Step 2 of 5',
  description: 'Configuring database',
  progress: 40,  // Percentage
  nextNodeId: 'next-step',
}
```

### Integration with FloatingChat

The AI can generate flows and return them as part of the chat response:

```tsx
// The AI returns a flow in the response
const aiResponse = {
  type: 'flow',
  flow: createFeatureFlow,
};

// FloatingChat automatically renders the flow
// User interacts with flow
// Results are sent back to AI for processing
```

---

## Best Practices

### React Flow

#### ✅ Do

- Use custom node components for rich interactions
- Implement proper node positioning logic
- Use `memo` for node components to prevent unnecessary re-renders
- Provide clear visual feedback for selected/hovered nodes
- Use handles for connection points
- Implement minimap for large graphs
- Add keyboard shortcuts for common actions

#### ❌ Don't

- Put too much logic in node components
- Forget to handle edge cases in positioning
- Create nodes that are too complex (split into smaller nodes)
- Ignore accessibility in custom nodes
- Skip performance optimization for large graphs

### Interactive Flows

#### ✅ Do

- Keep flows focused on a single task
- Provide clear descriptions at each step
- Use appropriate node types for each interaction
- Handle errors gracefully
- Show progress for multi-step flows
- Allow users to go back/cancel
- Validate inputs before proceeding

#### ❌ Don't

- Create overly complex flows (>10 nodes)
- Skip confirmation for destructive actions
- Forget to handle edge cases
- Make flows too rigid (allow flexibility)
- Skip result/success nodes

---

## Advanced Patterns

### React Flow with Store Integration

```tsx
import { useFeatureStore } from './store/useFeatureStore';

const FeaturesView = () => {
  const selectedFeature = useFeatureStore((state) => state.selectedFeature);
  const setSelectedFeature = useFeatureStore((state) => state.setSelectedFeature);
  const expandedIds = useFeatureStore((state) => state.expandedIds);

  const nodes = useMemo(() =>
    features.map((feature) => ({
      id: feature.id,
      type: 'featureNode',
      data: {
        ...feature,
        isSelected: selectedFeature?.id === feature.id,
        isExpanded: expandedIds.has(feature.id),
        onClick: () => setSelectedFeature(feature),
      },
    })),
    [features, selectedFeature, expandedIds]
  );

  return <ReactFlow nodes={nodes} ... />;
};
```

### Dynamic Flow Generation

```tsx
const generateOnboardingFlow = (user: User): Flow => {
  const nodes: FlowNode[] = [
    {
      id: 'welcome',
      type: 'action',
      title: `Welcome, ${user.name}!`,
      description: 'Let\'s get you set up',
      nextNodeId: 'input-company',
    },
  ];

  // Add conditional nodes based on user data
  if (!user.company) {
    nodes.push({
      id: 'input-company',
      type: 'input',
      title: 'Company Name',
      nextNodeId: 'select-role',
    });
  }

  return {
    id: 'onboarding',
    title: 'Onboarding',
    startNodeId: 'welcome',
    nodes,
  };
};
```

---

**Related Documentation:**
- [State Management](./state-management.md) - Managing flow and graph state
- [Component Patterns](./component-patterns.md) - Building flow UI components
- [Layout Patterns](./layout-patterns.md) - Integrating flows in layouts
