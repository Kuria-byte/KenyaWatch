import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Leader } from "@/types/leaders"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AlertCircle, CheckCircle2, FileText, Info, Loader2 } from "lucide-react"

const RECALL_REASONS = [
  { id: "misconduct", label: "Gross Misconduct", description: "Serious violations of ethical standards or criminal behavior" },
  { id: "corruption", label: "Corruption Allegations", description: "Misuse of public funds or abuse of power" },
  { id: "performance", label: "Performance Failure", description: "Consistent failure to fulfill official duties" },
  { id: "constitutional", label: "Constitutional Violations", description: "Actions that violate constitutional principles" },
]

const REQUIRED_SIGNATURES = 15000 // Example threshold
const MIN_EVIDENCE_FILES = 2

const STEPS = [
  { title: "Overview", icon: Info },
  { title: "Grounds", icon: FileText },
  { title: "Evidence", icon: AlertCircle },
  { title: "Declaration", icon: CheckCircle2 },
]

interface RecallModalProps {
  leader: Leader
  open: boolean
  onClose: () => void
}

export function RecallModal({ leader, open, onClose }: RecallModalProps) {
  const [step, setStep] = useState(1)
  const [reason, setReason] = useState("")
  const [evidence, setEvidence] = useState<File[]>([])
  const [description, setDescription] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const progress = (step / 4) * 100

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      toast.success("Recall petition initiated", {
        description: (
          <div className="space-y-2">
            <p>Your recall petition for {leader.name} has been registered.</p>
            <ul className="list-disc pl-4 text-sm">
              <li>Petition ID: {Math.random().toString(36).slice(2, 10).toUpperCase()}</li>
              <li>Will be forwarded to IEBC within 24 hours</li>
              <li>You'll receive email updates on next steps</li>
            </ul>
          </div>
        ),
        duration: 5000,
      })
      onClose()
    } catch (error) {
      toast.error("Submission failed", {
        description: "Please try again or contact support if the issue persists."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <TooltipProvider>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Recall Petition - {leader.name}
            </DialogTitle>
            
            {/* Modern Stepper */}
            <div className="flex justify-between items-center mt-4 mb-6">
              {STEPS.map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step > i 
                        ? "bg-green-100 text-green-600" 
                        : step === i + 1 
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-1">{s.title}</span>
                  {i < STEPS.length - 1 && (
                    <div className={`h-[2px] w-[100px] mt-2 ${
                      step > i ? "bg-green-400" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </DialogHeader>

          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
                <h4 className="font-medium text-blue-800 text-lg mb-3">
                  Understanding the Recall Process
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-blue-700">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Requires {REQUIRED_SIGNATURES.toLocaleString()} verified signatures</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-700">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>The process typically takes 60-90 days</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-700">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>False allegations may result in legal consequences</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-700">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>All evidence must be verifiable</span>
                  </li>
                </ul>
              </div>
              <Button 
                className="w-full h-12 text-lg"
                onClick={() => setStep(2)}
              >
                Begin Petition Process
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Select Reason for Recall</h4>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {RECALL_REASONS.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {reason && (
                  <p className="text-sm text-gray-600 mt-2">
                    {RECALL_REASONS.find(r => r.id === reason)?.description}
                  </p>
                )}
              </div>
              <Button 
                className="w-full" 
                disabled={!reason}
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  Evidence Upload
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Accepted formats: PDF, DOC, JPG, PNG, MP4
                    </TooltipContent>
                  </Tooltip>
                </h4>
                <label className="block">
                  <span className="sr-only">Upload evidence files</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4"
                    onChange={(e) => setEvidence(Array.from(e.target.files || []))}
                    className="w-full border rounded p-2"
                  />
                </label>
                {evidence.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {evidence.length} file(s) selected
                  </p>
                )}
              </div>
              <Button 
                className="w-full" 
                disabled={evidence.length < MIN_EVIDENCE_FILES}
                onClick={() => setStep(4)}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-3">Final Declaration</h4>
                <Textarea
                  placeholder="Detail specific incidents, dates, and impact on constituency..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
                <div className="mt-4 flex items-center gap-2 p-3 bg-white rounded border">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-700">
                    I solemnly declare that all information provided is true and accurate
                  </label>
                </div>
              </div>
              <Button 
                className="w-full h-12"
                variant="destructive"
                disabled={!description || !agreed || description.length < 100 || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting Petition...
                  </>
                ) : (
                  'Submit Recall Petition'
                )}
              </Button>
            </div>
          )}

          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="mt-2"
            >
              Back
            </Button>
          )}
        </DialogContent>
      </TooltipProvider>
    </Dialog>
  )
}
