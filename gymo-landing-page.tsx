"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

function ContactForm() {
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
      setStatus("error")
      setIsSubmitting(false)
      return
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error")
      setIsSubmitting(false)
      return
    }

    if (!formData.userType) {
      setStatus("error")
      setIsSubmitting(false)
      return
    }

    if ((formData.userType === "trainer" || formData.userType === "gym") && !formData.studentCount) {
      setStatus("error")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setStatus("success")
    setIsSubmitting(false)

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: "", email: "", userType: "", studentCount: "" })
      setStatus("idle")
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (status !== "idle") setStatus("idle")
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Entre em contato</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Digite seu nome"
              className={status === "error" && !formData.name.trim() ? "border-red-500" : ""}
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Digite seu e-mail"
              className={
                status === "error" && (!formData.email.trim() || !formData.email.includes("@")) ? "border-red-500" : ""
              }
            />
          </div>

          {/* User Type Field */}
          <div className="space-y-2">
            <Label htmlFor="userType">Você é:</Label>
            <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
              <SelectTrigger className={status === "error" && !formData.userType ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trainer">Treinador(a)</SelectItem>
                <SelectItem value="gym">Tenho uma academia</SelectItem>
                <SelectItem value="student">Aluno(a)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student Count Field - Only show for trainers and gym owners */}
          {(formData.userType === "trainer" || formData.userType === "gym") && (
            <div className="space-y-2">
              <Label htmlFor="studentCount">Quantos alunos você atende?</Label>
              <Select value={formData.studentCount} onValueChange={(value) => handleInputChange("studentCount", value)}>
                <SelectTrigger className={status === "error" && !formData.studentCount ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="up-to-20">Até 20 alunos</SelectItem>
                  <SelectItem value="up-to-50">Até 50 alunos</SelectItem>
                  <SelectItem value="up-to-100">Até 100 alunos</SelectItem>
                  <SelectItem value="more-than-100">Mais de 100 alunos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>

          {/* Status Messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Formulário enviado com sucesso!</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <XCircle className="h-4 w-4" />
              <span>Por favor, preencha todos os campos obrigatórios.</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

function FeatureCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  const features = [
    {
      title: "Conecte-se, treine e evolua juntos.",
      description:
        "Mensagens diretas, atualizações de treino e notificações em tempo real para manter o máximo engajamento entre treinador e aluno.",
      image: "/classical-statues.png",
    },
    {
      title: "Monte treinos e compartilhe com facilidade.",
      description:
        "Estruture treinos completos, organize a agenda e envie tudo direto para o app do aluno, em poucos cliques.",
      image: "/feature-1.png",
    },
    {
      title: "Progresso visível, treino após treino.",
      description: "O aluno acompanha seu desempenho com gráficos claros e dados atualizados.",
      image: "/feature-2.png",
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % features.length)
  }, [features.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsUserInteracting(true)
    // Reset user interaction after 20 seconds
    setTimeout(() => setIsUserInteracting(false), 20000)
  }

  useEffect(() => {
    if (!isUserInteracting) {
      const interval = setInterval(nextSlide, 10000)
      return () => clearInterval(interval)
    }
  }, [nextSlide, isUserInteracting])

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white">{features[currentSlide].title}</h3>
      <p className="text-lg opacity-80 mb-12 leading-relaxed text-white max-w-2xl">
        {features[currentSlide].description}
      </p>

      {/* Feature image */}
      <div className="bg-[#D4C4A8] rounded-2xl p-8 mb-8 flex justify-center">
        <div className="w-full max-w-md h-64 relative">
          <Image
            src={features[currentSlide].image || "/placeholder.svg"}
            alt={features[currentSlide].title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Carousel dots */}
      <div className="flex justify-center space-x-3">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}

function MobileAppCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  const appScreens = [
    {
      title: "Compartilhe sua jornada e comemore resultados juntos!",
      description:
        "Mostre ao mundo sua batalha e seus resultados, em diversas modalidades, seja musculação, corrida, bike, crossfit e mais...",
      mockup: (
        <div className="bg-white rounded-3xl p-3 w-48 h-80 shadow-2xl">
          <div className="bg-gray-100 rounded-2xl w-full h-full p-4">
            <div className="bg-orange-500 rounded-lg h-12 mb-4"></div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-300 rounded-lg h-20"></div>
              <div className="bg-gray-300 rounded-lg h-20"></div>
            </div>
            <div className="space-y-2">
              <div className="bg-blue-500 rounded-lg h-6"></div>
              <div className="bg-red-500 rounded-lg h-6"></div>
              <div className="bg-green-500 rounded-lg h-6"></div>
              <div className="bg-yellow-500 rounded-lg h-6"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Acompanhe seu progresso diário!",
      description:
        "Interface intuitiva para acompanhar treinos, exercícios e evolução com gráficos detalhados e motivação constante.",
      mockup: (
        <div className="bg-white rounded-3xl p-3 w-48 h-80 shadow-2xl">
          <div className="bg-gray-100 rounded-2xl w-full h-full relative overflow-hidden">
            <Image src="/mobile-app.png" alt="Mobile app interface" fill className="object-cover rounded-2xl" />
          </div>
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
    // Reset user interaction after 20 seconds
    setTimeout(() => setIsUserInteracting(false), 20000)
  }

  useEffect(() => {
    if (!isUserInteracting) {
      const interval = setInterval(nextSlide, 10000)
      return () => clearInterval(interval)
    }
  }, [nextSlide, isUserInteracting])

  return (
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 flex-shrink-0"
        onClick={() => handleNavigation("prev")}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <div className="flex-1 mx-8 lg:mx-16 text-center">
        <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">{appScreens[currentSlide].title}</h3>
        <p className="text-lg opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
          {appScreens[currentSlide].description}
        </p>

        {/* Phone mockup */}
        <div className="flex justify-center">{appScreens[currentSlide].mockup}</div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 flex-shrink-0"
        onClick={() => handleNavigation("next")}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  )
}

export default function GymoLandingPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-end px-8 lg:px-16">
        {/* Background gradient image */}
        <div className="absolute inset-0">
          <Image src="/gradient-background.png" alt="Gradient background" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 max-w-md lg:max-w-lg text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">GYMO</h1>
          <h2 className="text-xl lg:text-2xl font-semibold mb-6 leading-tight">
            Conectamos profissionais e alunos que levam o treino a outro nível.
          </h2>
          <p className="text-base lg:text-lg opacity-90 leading-relaxed">
            A plataforma que une treinadores e alunos em um só lugar. Um espaço para gerenciar treinos, acompanhar
            resultados e manter uma comunicação eficiente e constante.
          </p>
        </div>

        {/* Classical statue in hero */}
        <div className="absolute bottom-0 right-8 lg:right-16 w-48 lg:w-64 h-64 lg:h-80 opacity-20">
          <Image
            src="/statue-phone.png"
            alt="Classical statue with phone"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </section>

      {/* Connect Section with Carousel */}
      <section className="bg-[#2C2C2C] py-16 lg:py-24">
        <div className="container mx-auto px-8">
          <FeatureCarousel />
        </div>
      </section>

      {/* Share Results Section with Mobile Carousel */}
      <section
        className="py-16 lg:py-24 text-white relative"
        style={{
          background: "linear-gradient(135deg, #FF6B35 0%, #FF4500 100%)",
        }}
      >
        <div className="container mx-auto px-8">
          <MobileAppCarousel />
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="bg-[#2C2C2C] py-16 lg:py-24">
        <div className="container mx-auto px-8 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-12">Conheça um pouco da nossa plataforma</h3>
          <div className="bg-[#1A1A1A] rounded-2xl p-16 lg:p-24 min-h-[400px] flex items-center justify-center max-w-4xl mx-auto">
            <p className="text-gray-500 text-xl">Platform preview content</p>
          </div>
        </div>
      </section>

      {/* Join Team Section - Contact Form */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-8">
          <h3 className="text-center text-2xl lg:text-3xl font-semibold text-gray-800 mb-12">Faça parte desse time</h3>

          <div className="flex items-start justify-center gap-16 max-w-6xl mx-auto">
            {/* Bodybuilder image */}
            <div className="w-64 h-80 relative flex-shrink-0">
              <Image
                src="/placeholder.svg?height=320&width=256"
                alt="Bodybuilder flexing"
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-zinc-900 max-h-2 flex-col justify-center items-center">
        <p>Fale conosco: <a href="miguloaisf">email</a></p>

      </footer>
    </div>
  )
}
