import { useState, useEffect } from 'react';
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
} from 'reactflow';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
    Plus,
    HeartPulse,
    ScanSearch,
    Network,
    ListTree,
} from 'lucide-react';
import { motion } from 'framer-motion';
import 'reactflow/dist/style.css';

// Simplified Family Member Node Component
function FamilyMemberNode({ data }) {
    return (
        <div className="relative group">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-1 rounded-full cursor-pointer ${
                    data.isUser ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-white dark:bg-gray-800'
                }`}
            >
                <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 border-4 border-white/20">
                        <AvatarImage src={data.avatar} />
                        <AvatarFallback className="bg-gray-100 dark:bg-gray-700">
                            <ScanSearch className="h-10 w-10 text-gray-400" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                        <h3 className="font-semibold text-sm dark:text-white">{data.name}</h3>
                        <p className="text-xs text-muted-foreground">{data.role}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

const nodeTypes = {
    familyMember: FamilyMemberNode,
};

// Initial demo data
const initialNodes = [
    {
        id: '1',
        type: 'familyMember',
        position: { x: 250, y: 100 },
        data: { name: 'John Doe', role: 'Self', isUser: true }
    },
    {
        id: '2',
        type: 'familyMember',
        position: { x: 100, y: 250 },
        data: { name: 'Sarah Doe', role: 'Mother' }
    },
    {
        id: '3',
        type: 'familyMember',
        position: { x: 400, y: 250 },
        data: { name: 'Mike Doe', role: 'Father' }
    },
];

const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#64748b', strokeWidth: 2 }
    },
    {
        id: 'e1-3',
        source: '1',
        target: '3',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#64748b', strokeWidth: 2 }
    },
];

export default function FamilyTree() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [viewMode, setViewMode] = useState<'tree' | 'radial'>('tree');

    return (
        <div className="h-[800px] relative rounded-3xl overflow-hidden 
            bg-gradient-to-br from-blue-50/20 to-purple-50/20
            dark:from-gray-900/80 dark:to-gray-800/80
            border border-white/20 dark:border-gray-700/50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                className="interactive-tree"
            >
                <Background className="dark:bg-gray-900/50" />
                <Controls className="dark:bg-gray-800 rounded-lg shadow-xl" />

                {/* Control Buttons */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button
                        variant="outline"
                        className="backdrop-blur-lg bg-white/50 dark:bg-gray-800/50"
                        onClick={() => setViewMode(v => v === 'tree' ? 'radial' : 'tree')}
                    >
                        {viewMode === 'tree' ? <Network className="h-4 w-4" /> : <ListTree className="h-4 w-4" />}
                    </Button>
                    <Button variant="default" className="shadow-lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                    </Button>
                </div>

                {/* Family Health Status */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-4 left-4 z-10"
                >
                    <Card className="p-4 backdrop-blur-lg bg-white/50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping" />
                                <HeartPulse className="h-8 w-8 text-red-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Family Health Score</h3>
                                <div className="flex items-center gap-2">
                                    <Progress value={78} className="w-32 h-2" />
                                    <span className="text-sm">78/100</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </ReactFlow>
        </div>
    );
}