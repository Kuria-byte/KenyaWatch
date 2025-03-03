import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface AboutSectionProps {
  data: {
    education: string[];
    certifications: string[];
    careerTimeline: {
      period: string;
      position: string;
    }[];
    catchphrases: string[];
  }
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Education</h3>
          <ul className="space-y-2">
            {data.education.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Career Timeline</h3>
          <div className="space-y-4">
            {data.careerTimeline.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{item.period}</span>
                <span>{item.position}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};