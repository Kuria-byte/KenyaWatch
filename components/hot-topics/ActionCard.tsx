import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: string; // URL or function name
  secondaryAction?: {
    text: string;
    url: string;
  };
  children?: React.ReactNode;
}

export function ActionCard({
  title,
  description,
  buttonText,
  buttonAction,
  secondaryAction,
  children,
}: ActionCardProps) {
  const isUrl = buttonAction.startsWith("http");

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {children}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2">
        {isUrl ? (
          <Button className="w-full sm:w-auto" asChild>
            <a href={buttonAction} target="_blank" rel="noopener noreferrer">
              {buttonText}
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        ) : (
          <Button className="w-full sm:w-auto">
            {buttonText}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
        
        {secondaryAction && (
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <a href={secondaryAction.url} target="_blank" rel="noopener noreferrer">
              {secondaryAction.text}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
