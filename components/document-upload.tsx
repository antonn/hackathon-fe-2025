"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  file: File
  id: string
  progress: number
  status: "uploading" | "completed" | "error"
}

interface RegulatoryCase {
  id: string
  name: string
  createdAt: Date
  documentsCount: number
  status: "processing" | "analyzed" | "pending_review"
}

// Generate regulatory case names
const generateCaseName = () => {
  const prefixes = ["FINMA", "BASEL", "MIFID", "DORA", "ESG", "CRDIV", "EMIR"]
  const types = ["COMPLIANCE", "ANALYSIS", "REVIEW", "ASSESSMENT", "AUDIT"]
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, "0")
  const day = String(new Date().getDate()).padStart(2, "0")
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const type = types[Math.floor(Math.random() * types.length)]

  return `${prefix}-${type}-${year}${month}${day}-${random}`
}

export function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [externalReview, setExternalReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [regulatoryCases, setRegulatoryCases] = useState<RegulatoryCase[]>([])
  const [regulatoryCaseName, setRegulatoryCaseName] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: "uploading" as const,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((uploadedFile) => {
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.id === uploadedFile.id) {
              const newProgress = Math.min(f.progress + Math.random() * 30, 100)
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? "completed" : "uploading",
              }
            }
            return f
          }),
        )
      }, 500)

      setTimeout(() => clearInterval(interval), 3000)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleSubmit = async () => {
    if (files.length === 0 || !regulatoryCaseName.trim()) return

    setIsSubmitting(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create new regulatory case with user-provided name
    const newCase: RegulatoryCase = {
      id: Math.random().toString(36).substr(2, 9),
      name: regulatoryCaseName.trim(),
      createdAt: new Date(),
      documentsCount: files.length,
      status: "processing",
    }

    setRegulatoryCases((prev) => [newCase, ...prev])

    // Clear form
    setFiles([])
    setExternalReview("")
    setRegulatoryCaseName("")
    setIsSubmitting(false)
  }

  const suggestCaseName = () => {
    setRegulatoryCaseName(generateCaseName())
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Regulatory Documents</CardTitle>
          <CardDescription>
            Upload PDF documents for regulatory analysis. Each submission creates a new regulatory case.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drag and Drop Zone */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            )}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop the PDF files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drag & drop PDF files here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to select files</p>
                <Button variant="outline">Select Files</Button>
              </div>
            )}
          </div>

          {/* Regulatory Case Name */}
          <div className="space-y-2">
            <Label htmlFor="case-name">Regulatory Case Name *</Label>
            <div className="flex space-x-2">
              <input
                id="case-name"
                type="text"
                placeholder="Enter a name for this regulatory case..."
                value={regulatoryCaseName}
                onChange={(e) => setRegulatoryCaseName(e.target.value)}
                className="flex-1 px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={suggestCaseName}
                className="whitespace-nowrap bg-transparent"
              >
                Suggest Name
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Provide a descriptive name for this regulatory analysis case
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({files.length})</Label>
              {files.map((uploadedFile) => (
                <div key={uploadedFile.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    <FileText className="h-5 w-5 text-red-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {uploadedFile.status === "uploading" && (
                      <div className="w-20">
                        <Progress value={uploadedFile.progress} className="h-2" />
                      </div>
                    )}
                    {uploadedFile.status === "completed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {uploadedFile.status === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(uploadedFile.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* External Review */}
          <div className="space-y-2">
            <Label htmlFor="external-review">External Review Notes (Optional)</Label>
            <Textarea
              id="external-review"
              placeholder="Add any external review comments, regulatory context, or special instructions for this analysis..."
              value={externalReview}
              onChange={(e) => setExternalReview(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={
              files.length === 0 ||
              !regulatoryCaseName.trim() ||
              isSubmitting ||
              files.some((f) => f.status === "uploading")
            }
            className="w-full"
          >
            {isSubmitting ? "Creating Regulatory Case..." : "Submit for Analysis"}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Regulatory Cases */}
      {regulatoryCases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Regulatory Cases</CardTitle>
            <CardDescription>Newly created regulatory cases from your document submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {regulatoryCases.map((regulatoryCase) => (
                <div key={regulatoryCase.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium">{regulatoryCase.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {regulatoryCase.documentsCount} document{regulatoryCase.documentsCount !== 1 ? "s" : ""} •
                        Created {regulatoryCase.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="capitalize">
                      {regulatoryCase.status.replace("_", " ")}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View Case
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
