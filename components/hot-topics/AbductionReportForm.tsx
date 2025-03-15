import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function AbductionReportForm() {
  const [formState, setFormState] = useState({
    victimName: "",
    victimAge: "",
    victimGender: "",
    location: "",
    date: "",
    time: "",
    description: "",
    witnesses: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    relationship: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate form submission
    setTimeout(() => {
      // In a real implementation, this would be an API call
      if (Math.random() > 0.2) { // 80% success rate for demo
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setErrorMessage("Network error. Please try again or contact our helpline at 0800-MISSING.");
      }
    }, 1500);
  };

  if (formStatus === "success") {
    return (
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <h3 className="text-xl font-semibold">Report Submitted Successfully</h3>
            <p className="text-muted-foreground">
              Your report has been submitted and assigned case number <span className="font-mono font-medium">AB-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>.
              Our team will contact you within 24 hours.
            </p>
            <div className="bg-muted p-4 rounded-lg w-full text-left">
              <h4 className="font-medium mb-2">Next Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>File a police report if you haven't already</li>
                <li>Gather any additional evidence (photos, CCTV footage)</li>
                <li>Keep your phone available for contact from authorities</li>
              </ol>
            </div>
            <Button onClick={() => setFormStatus("idle")} className="mt-4">Submit Another Report</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-semibold text-lg mb-4">Report an Abduction</h3>
          
          {formStatus === "error" && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Error submitting report</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground">Victim Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="victimName">Full Name *</Label>
                <Input 
                  id="victimName" 
                  name="victimName" 
                  value={formState.victimName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="victimAge">Age *</Label>
                  <Input 
                    id="victimAge" 
                    name="victimAge" 
                    type="number" 
                    min="0" 
                    max="120" 
                    value={formState.victimAge} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="victimGender">Gender *</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("victimGender", value)} 
                    defaultValue={formState.victimGender}
                  >
                    <SelectTrigger id="victimGender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-sm text-muted-foreground pt-2">Incident Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="e.g., Westlands, Nairobi" 
                  value={formState.location} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    value={formState.date} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time (approx.)</Label>
                  <Input 
                    id="time" 
                    name="time" 
                    type="time" 
                    value={formState.time} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description of Incident *</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Provide as much detail as possible about what happened" 
                value={formState.description} 
                onChange={handleChange} 
                required 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="witnesses">Witnesses (if any)</Label>
              <Textarea 
                id="witnesses" 
                name="witnesses" 
                placeholder="Names and contact information of any witnesses" 
                value={formState.witnesses} 
                onChange={handleChange} 
                className="min-h-[60px]"
              />
            </div>
            
            <h4 className="font-medium text-sm text-muted-foreground pt-2">Contact Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Your Name *</Label>
                <Input 
                  id="contactName" 
                  name="contactName" 
                  value={formState.contactName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship to Victim *</Label>
                <Input 
                  id="relationship" 
                  name="relationship" 
                  placeholder="e.g., Parent, Sibling, Friend" 
                  value={formState.relationship} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <Input 
                  id="contactPhone" 
                  name="contactPhone" 
                  type="tel" 
                  placeholder="+254 7XX XXX XXX" 
                  value={formState.contactPhone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input 
                  id="contactEmail" 
                  name="contactEmail" 
                  type="email" 
                  value={formState.contactEmail} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            * Required fields. All information is kept confidential and shared only with relevant authorities.
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={formStatus === "submitting"}
            >
              {formStatus === "submitting" ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
