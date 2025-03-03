import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TrackRecordSectionProps {
  data: {
    projects: {
      name: string;
      status: string;
      budget: string;
      completion: number;
    }[];
    legislative: {
      billsSponsored: number;
      billsPassed: number;
      attendance: number;
    };
    promises: {
      made: string;
      delivered: string;
      status: "success" | "warning" | "danger";
    }[];
  }
}

export const TrackRecordSection: React.FC<TrackRecordSectionProps> = ({ data }) => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Projects</h3>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{project.name}</span>
                  <span>{project.budget}</span>
                </div>
                <Progress value={project.completion} className="h-2" />
                <span className="text-sm text-muted-foreground">{project.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Legislative Performance</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Bills Sponsored</span>
              <span>{data.legislative.billsSponsored}</span>
            </div>
            <div className="flex justify-between">
              <span>Bills Passed</span>
              <span>{data.legislative.billsPassed}</span>
            </div>
            <div className="flex justify-between">
              <span>Attendance Rate</span>
              <span>{data.legislative.attendance}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};