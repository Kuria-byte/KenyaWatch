import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItemProps {
  title: string;
  source: string;
  date: string;
  url: string;
  snippet: string;
}

export function NewsItem({ title, source, date, url, snippet }: NewsItemProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-2">{title}</h3>
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <span className="font-medium">{source}</span>
          <span className="mx-2">•</span>
          <Calendar className="h-3 w-3 mr-1" />
          <span>{date}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{snippet}</p>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Read Full Article
            <ExternalLink className="h-3 w-3 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
