import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project, Promise } from "@/types/leaders";
import { calculateProjectCompletionRate, calculatePromiseFulfillment, calculateAttendanceRate } from "@/utils/leaders-utils";

interface TrackRecordSectionProps {
  projects: Project[];
  promises: Promise[];
  attendance: { period: string; present: number; absent: number; total: number; }[];
  keyAchievements: string[];
}

export const TrackRecordSection: React.FC<TrackRecordSectionProps> = ({ projects, promises, attendance, keyAchievements }) => {
  const getStatusColor = (status: Project['status'] | Promise['status']) => {
    const colors = {
      'completed': 'bg-green-500/10 text-green-500',
      'ongoing': 'bg-blue-500/10 text-blue-500',
      'delayed': 'bg-yellow-500/10 text-yellow-500',
      'cancelled': 'bg-red-500/10 text-red-500',
      'fulfilled': 'bg-green-500/10 text-green-500',
      'in-progress': 'bg-blue-500/10 text-blue-500',
      'broken': 'bg-red-500/10 text-red-500',
      'pending': 'bg-yellow-500/10 text-yellow-500',
    }
    return colors[status] || 'bg-gray-500/10 text-gray-500'
  }

  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Project Completion</p>
            <p className="text-2xl font-bold">{calculateProjectCompletionRate({ projects } as any)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Promise Fulfillment</p>
            <p className="text-2xl font-bold">{calculatePromiseFulfillment({ promises } as any).fulfillmentRate}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
            <p className="text-2xl font-bold">{calculateAttendanceRate({ attendance } as any)}%</p>
          </div>
        </div>
      </Card>

      {/* Key Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Achievements</h3>
        <div className="space-y-4">
          {keyAchievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">{index + 1}</span>
              </div>
              <p className="text-sm">{achievement}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Projects Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{project.name}</h4>
                <Badge variant="outline" className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={project.completion} className="h-2" />
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Completion: {project.completion}%</span>
                  <span>Budget: KES {project.budget.toLocaleString()}</span>
                  <span>Spent: KES {project.spent.toLocaleString()}</span>
                  <span>Location: {project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Promises Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Campaign Promises</h3>
        <div className="space-y-4">
          {promises.map((promise) => (
            <div key={promise.id} className="flex items-start justify-between gap-4 pb-4 border-b last:border-0">
              <div>
                <p className="font-medium">{promise.description}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                  <span>Category: {promise.category}</span>
                  <span>Due: {new Date(promise.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              <Badge variant="outline" className={getStatusColor(promise.status)}>
                {promise.status.replace('-', ' ')}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Attendance Record */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Attendance Record</h3>
        <div className="space-y-4">
          {attendance.map((record, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-medium">{record.period}</p>
                <p className="text-sm text-muted-foreground">
                  {record.present} / {record.total} sessions
                </p>
              </div>
              <Progress 
                value={(record.present / record.total) * 100} 
                className="h-2" 
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};