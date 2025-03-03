import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface TrackRecordSectionProps {
  data: {
    projects: Array<{
      name: string;
      status: string;
      budget: string;
      completion: number;
    }>;
    legislative: {
      billsSponsored: number;
      billsPassed: number;
      attendance: number;
    };
    promises: Array<{
      made: string;
      delivered: string;
      status: "success" | "warning" | "danger";
    }>;
  };
}

export const TrackRecordSection: React.FC<TrackRecordSectionProps> = ({ data }) => {
  const getStatusIcon = (status: "success" | "warning" | "danger") => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "warning":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "danger":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="grid gap-6">
      {/* Projects Section */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{project.name}</h4>
                <span className="text-sm font-mono">{project.budget}</span>
              </div>
              <div className="space-y-1">
                <Progress value={project.completion} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{project.status}</span>
                  <span>{project.completion}% Complete</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Legislative Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Legislative Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Bills Sponsored</span>
                <span className="font-mono">{data.legislative.billsSponsored}</span>
              </div>
              <Progress
                value={(data.legislative.billsPassed / data.legislative.billsSponsored) * 100}
                className="h-2"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Attendance Rate</span>
              <span>{data.legislative.attendance}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Promises */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Promises</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.promises.map((promise, index) => (
              <div key={index} className="flex items-start gap-3">
                {getStatusIcon(promise.status)}
                <div className="space-y-1">
                  <p className="font-medium">{promise.made}</p>
                  <p className="text-sm text-muted-foreground">{promise.delivered}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};