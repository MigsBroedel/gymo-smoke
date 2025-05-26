"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { useTranslations } from 'next-intl';

function ContactForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    studentCount: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  

  const handleSubmit = async (e: React.FormEvent) => {




    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    // Validation
    if (!formData.name.trim()) {
      console.log("name error")
      setStatus("error")
      setIsSubmitting(false)
      return
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      console.log("email error")
      setStatus("error")
      setIsSubmitting(false)
      return
    }

    if (!formData.userType) {
      console.log("role error")
      setStatus("error")
      setIsSubmitting(false)
      return
    }

    if ((formData.userType === "trainer" || formData.userType === "gym") && !formData.studentCount) {
      setStatus("error")
      setIsSubmitting(false)
      return
    }

  

    // API call
    try {
      console.log("call")
      const response = await fetch(process.env.API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

   

      if (!response) throw new Error("erro na API")

      setStatus("success")
      setIsSubmitting(false);

      setTimeout(() => {
      setFormData({ name: "", email: "", userType: "", studentCount: "" })
      setStatus("idle")
    }, 3000)
    }

    catch (error) {
      console.log(error)
      setStatus("error")
      setIsSubmitting(false)
    }

    // Reset form after success
    
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (status !== "idle") setStatus("idle")
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">{t('form.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">{t('form.name')}</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder={t('form.namePlaceholder')}
              className={status === "error" && !formData.name.trim() ? "border-red-500" : ""}
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('form.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder={t('form.emailPlaceholder')}
              className={
                status === "error" && (!formData.email.trim() || !formData.email.includes("@")) ? "border-red-500" : ""
              }
            />
          </div>

          {/* User Type Field */}
          <div className="space-y-2">
            <Label htmlFor="userType">{t('form.roleLabel')}</Label>
            <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
              <SelectTrigger className={status === "error" && !formData.userType ? "border-red-500" : ""}>
                <SelectValue placeholder={t('form.rolePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trainer">{t('form.role.trainer')}</SelectItem>
                <SelectItem value="gym">{t('form.role.gym')}</SelectItem>
                <SelectItem value="student">{t('form.role.student')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student Count Field - Only show for trainers and gym owners */}
          {(formData.userType === "trainer" || formData.userType === "gym") && (
            <div className="space-y-2">
              <Label htmlFor="studentCount">{t('form.studentCount')}</Label>
              <Select value={formData.studentCount} onValueChange={(value) => handleInputChange("studentCount", value)}>
                <SelectTrigger className={status === "error" && !formData.studentCount ? "border-red-500" : ""}>
                  <SelectValue placeholder={t('form.studentCountPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="up-to-20">{t('form.studentCountOptions.20')}</SelectItem>
                  <SelectItem value="up-to-50">{t('form.studentCountOptions.50')}</SelectItem>
                  <SelectItem value="up-to-100">{t('form.studentCountOptions.100')}</SelectItem>
                  <SelectItem value="more-than-100">{t('form.studentCountOptions.100plus')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isSubmitting}>
            {isSubmitting ? t('form.sending') : t('form.submit')}
          </Button>

          {/* Status Messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>{t('form.success')}</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <XCircle className="h-4 w-4" />
              <span>{t('form.error')}</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

// --- FeatureCarousel improvements ---
function FeatureCarousel() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const features = [
    {
      title: t('carousel.0.title'),
      description: t('carousel.0.desc'),
      image: "/friends-statue.png",
    },
    {
      title: t('carousel.1.title'),
      description: t('carousel.1.desc'),
      image: "/statue-running.png",
    },
    {
      title: t('carousel.2.title'),
      description: t('carousel.2.desc'),
      image: "/cell-statue.png",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % features.length)
  }, [features.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length)
  }, [features.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsUserInteracting(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 20000)
  }

  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      prevSlide()
    } else {
      nextSlide()
    }
    setIsUserInteracting(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 20000)
  }

  useEffect(() => {
    if (!isUserInteracting) {
      const interval = setInterval(nextSlide, 10000)
      return () => clearInterval(interval)
    }
  }, [nextSlide, isUserInteracting])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
      {/* Texto à esquerda */}
      <div className="flex-1">
        <h3 className="text-6xl lg:text-6xl font-extrabold mb-6 text-white">
          {features[currentSlide].title}
        </h3>
        <div className="bg-orange-500 h-1 w-1/2 rounded-lg m-2" />
        <p className="text-xl opacity-80 mb-8 leading-relaxed text-white">
          {features[currentSlide].description}
        </p>
        {/* Carousel navigation */}
        
      </div>
  
      <div className="flex-col items-center justify-center">
        <div className=" bg-[#D4C4A8] rounded-2xl flex justify-center p-4">
        <div className="w-72 max-w-md h-64 relative">
          <Image
            src={features[currentSlide].image || "/placeholder.svg"}
            alt={features[currentSlide].title}
            fill
            className="object-contain object-bottom"
          />
        </div>
        </div>


        <div className="flex items-center space-x-3 mt-4 lg:mt-8  justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => handleNavigation("prev")}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => handleNavigation("next")}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
    </div>
  )
}

// --- MobileAppCarousel improvements ---
function MobileAppCarousel() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const appScreens = [
    {
      title: t('appCarousel.0.title'),
      description: t('appCarousel.0.desc'),
      mockup: (
        <div >
          <Image src="/social-mobile.png" alt="Mobile app interface" className="object-cover rounded-2xl border-2 border-black" width={300} height={300} />
        </div>
      ),
    },
    {
      title: t('appCarousel.1.title'),
      description: t('appCarousel.1.desc'),
      mockup: (
        <div>
          <Image src="/homemobile.png" alt="Mobile app interface" className="object-cover rounded-2xl border-2 border-black" width={300} height={300} />
        </div>
      ),
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % appScreens.length)
  }, [appScreens.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + appScreens.length) % appScreens.length)
  }, [appScreens.length])

  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      prevSlide()
    } else {
      nextSlide()
    }
    setIsUserInteracting(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 20000)
  }

  useEffect(() => {
    if (!isUserInteracting) {
      const interval = setInterval(nextSlide, 10000)
      return () => clearInterval(interval)
    }
  }, [nextSlide, isUserInteracting])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
      <div className="flex-1 flex-col justify-between mx-8 lg:mx-30 text-center ">
        <h3 className="text-2xl lg:text-4xl font-bold mb-6 leading-tight">{appScreens[currentSlide].title}</h3>
        <p className="text-lg lg:text-2xl opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
          {appScreens[currentSlide].description}
        </p>
      
        
      </div>
      <div className="flex items-center justify-between mx-auto">
        <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 flex-shrink-0"
        onClick={() => handleNavigation("prev")}
        aria-label="Previous app screen"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <div className="flex justify-center mx-4">{appScreens[currentSlide].mockup}</div>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 flex-shrink-0"
        onClick={() => handleNavigation("next")}
        aria-label="Next app screen"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
      </div>
    </div>
  )
}


function ExampleWebCarousel() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const appScreens = [
    {
      mockup: (
        <div>
          <Image src="/dashboardGYM.jpg" alt="WEB app interface" className="object-cover rounded-2xl" width={1000} height={800} />
        </div>
      ),
    },
    {
      mockup: (
        <div>
          <Image src="/dashboardGYM2.jpg" alt="WEB app interface" className="object-cover rounded-2xl" width={1000} height={800} />
        </div>
      ),
    },
    {
      mockup: (
        <div>
          <Image src="/dashboardSTU.jpg" alt="WEB app interface" className="object-cover rounded-2xl" width={1000} height={800} />
        </div>
      ),
    },
    {
      mockup: (
        <div>
          <Image src="/dashboardSTU2.jpg" alt="WEB app interface" className="object-cover rounded-2xl" width={1000} height={800} />
        </div>
      ),
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % appScreens.length)
  }, [appScreens.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + appScreens.length) % appScreens.length)
  }, [appScreens.length])

  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      prevSlide()
    } else {
      nextSlide()
    }
    setIsUserInteracting(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 20000)
  }

  useEffect(() => {
    if (!isUserInteracting) {
      const interval = setInterval(nextSlide, 10000)
      return () => clearInterval(interval)
    }
  }, [nextSlide, isUserInteracting])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 flex-shrink-0"
        onClick={() => handleNavigation("prev")}
        aria-label="Previous app screen"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <div className="flex-1 mx-8 lg:mx-16 text-center">
        <div className="flex justify-center">{appScreens[currentSlide].mockup}</div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 flex-shrink-0"
        onClick={() => handleNavigation("next")}
        aria-label="Next app screen"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  )
}

export default function GymoLandingPage() {
  const t = useTranslations();
  return (
    <div className="w-full bg-white">
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 lg:px-16">
        <div className="absolute inset-0 -z-0">
          <Image
            src="/gradient-background.png"
            alt="Gradient background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full z-10">
          <div className="text-white max-w-2xl px-4">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">{t('hero.title')}</h1>
            <h2 className="text-2xl lg:text-4xl font-semibold mb-4">{t('hero.subtitle')}</h2>
            <p className="text-lg lg:text-2xl">{t('hero.description')}</p>
          </div>

          <div className="relative w-80 h-96 lg:w-[30rem] bg-[#2D2D2D] rounded-xl lg:h-[48rem] mt-12">
            <Image
              src="/note-statue.png"  
              alt="Classical statue with phone"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </section>


      <section className="bg-[#2C2C2C] py-16 lg:py-38">
        <div className="container mx-auto px-8">
          <FeatureCarousel />
        </div>
      </section>


      <section
        className="py-16 lg:py-24 text-white relative"
        style={{
          background: "linear-gradient(135deg, #FF6B35 10%, #FF4500 100%)",
        }}
      >
        <div className="container mx-auto px-8">
          <MobileAppCarousel />
        </div>
      </section>


      <section className="bg-[#2C2C2C] py-16 lg:py-24">
        <div className="container mx-auto px-8 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-12">{t('platformPreview.title')}</h3>
          <div className="bg-[#1D1D1D] p-8 rounded-xl">
            <ExampleWebCarousel />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-8">
          <h3 className="text-center text-2xl lg:text-3xl font-semibold text-gray-800 mb-12">{t('joinTeam.title')}</h3>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
            <div className="w-2/3 bg-gray-500 rounded-lg relative flex-shrink-0">
              <Image
                src="/db-statue.png"
                alt="Bodybuilder flexing"
                width={650}
                height={750}
                className="object-cover rounded-2xl"
              />
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-zinc-900 h-32 flex-col justify-center items-center text-white text-center font-bold">
        <div className=" text-gray-400 p-10">
          <p>{t('footer.contact')} <a className="text-orange-500" href="miguloaisf">{t('footer.email')}</a></p>
          <p>{t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  )
}
