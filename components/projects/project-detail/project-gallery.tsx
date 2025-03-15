"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Image as ImageIcon, 
  Video, 
  File, 
  Download, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { Project } from "@/types/projects"
import { formatDate } from "@/utils/projects-utils"

interface ProjectGalleryProps {
  project: Project
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  const [activeTab, setActiveTab] = useState("images")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  
  const handleImageClick = (url: string, index: number) => {
    setSelectedImage(url)
    setSelectedImageIndex(index)
  }
  
  const handlePrevImage = () => {
    if (project.media.images.length <= 1) return
    
    const newIndex = selectedImageIndex === 0 
      ? project.media.images.length - 1 
      : selectedImageIndex - 1
      
    setSelectedImageIndex(newIndex)
    setSelectedImage(project.media.images[newIndex].url)
  }
  
  const handleNextImage = () => {
    if (project.media.images.length <= 1) return
    
    const newIndex = selectedImageIndex === project.media.images.length - 1 
      ? 0 
      : selectedImageIndex + 1
      
    setSelectedImageIndex(newIndex)
    setSelectedImage(project.media.images[newIndex].url)
  }
  
  return (
    <div className="space-y-6">
      {/* Media Tabs */}
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="images" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span>Images</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Images Tab */}
        <TabsContent value="images" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Project Images</CardTitle>
              <CardDescription>
                Visual documentation of the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.media.images.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No images available for this project.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.media.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative group cursor-pointer overflow-hidden rounded-md"
                      onClick={() => handleImageClick(image.url, index)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.caption || `Project image ${index + 1}`}
                        className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-2 text-white text-sm w-full">
                          {image.caption && (
                            <p className="line-clamp-2">{image.caption}</p>
                          )}
                          {image.date && (
                            <p className="text-xs opacity-80">{formatDate(image.date)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Image Lightbox */}
              <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 right-2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    {project.media.images.length > 1 && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
                          onClick={handlePrevImage}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
                          onClick={handleNextImage}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      </>
                    )}
                    
                    <div className="flex items-center justify-center bg-black/80 min-h-[200px]">
                      <img 
                        src={selectedImage || ''} 
                        alt="Project image"
                        className="max-h-[80vh] max-w-full"
                      />
                    </div>
                    
                    {project.media.images[selectedImageIndex]?.caption && (
                      <div className="bg-background p-4">
                        <h3 className="font-medium">
                          {project.media.images[selectedImageIndex].caption}
                        </h3>
                        {project.media.images[selectedImageIndex].date && (
                          <p className="text-sm text-muted-foreground">
                            {formatDate(project.media.images[selectedImageIndex].date!)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Videos Tab */}
        <TabsContent value="videos" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Project Videos</CardTitle>
              <CardDescription>
                Video documentation of the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.media.videos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No videos available for this project.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.media.videos.map((video, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-video bg-muted rounded-md overflow-hidden">
                        {/* This would be replaced with an actual video player */}
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{video.title || `Video ${index + 1}`}</h3>
                        {video.description && (
                          <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                        )}
                        {video.date && (
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(video.date)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
              <CardDescription>
                Related documents and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.media.documents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No documents available for this project.
                </div>
              ) : (
                <div className="space-y-4">
                  {project.media.documents.map((document, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 border rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <File className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">{document.title || `Document ${index + 1}`}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            {document.type && (
                              <span>{document.type.toUpperCase()}</span>
                            )}
                            {document.date && (
                              <span>{formatDate(document.date)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Citizen Submitted Media */}
      {project.citizenReports.some(report => report.mediaUrls.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Citizen Submitted Media</CardTitle>
            <CardDescription>
              Photos and videos submitted by citizens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.citizenReports
                .filter(report => report.mediaUrls.length > 0)
                .flatMap(report => 
                  report.mediaUrls.map((url, mediaIndex) => ({
                    url,
                    username: report.username,
                    date: report.timestamp,
                    id: `${report.id}-${mediaIndex}`
                  }))
                )
                .map((media) => (
                  <div 
                    key={media.id} 
                    className="relative group cursor-pointer overflow-hidden rounded-md"
                  >
                    <img 
                      src={media.url} 
                      alt={`Submitted by ${media.username}`}
                      className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-2 text-white text-sm w-full">
                        <p className="line-clamp-1">By: {media.username}</p>
                        <p className="text-xs opacity-80">{formatDate(media.date)}</p>
                      </div>
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
