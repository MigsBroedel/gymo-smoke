import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-end pr-8 lg:pr-16">
        <div
          className="w-full max-w-md lg:max-w-lg h-96 lg:h-[500px] rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #252422 0%, #eb5e28 100%)",
          }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">GYMO</h1>
            <h2 className="text-lg lg:text-xl font-semibold mb-4">
              Conectamos profissionais e alunos que levam o treino a outro nível.
            </h2>
            <p className="text-sm lg:text-base opacity-90 leading-relaxed">
              A plataforma que une treinadores e alunos em um só lugar. Um espaço para gerenciar treinos, acompanhar
              resultados e manter uma comunicação eficiente e constante.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 w-48 h-64 opacity-20">
            <Image
              src="/placeholder.svg?height=256&width=192"
              alt="Classical statue"
              width={192}
              height={256}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#252422] py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-white">
              <h3 className="text-xl font-bold mb-4">Monte treinos e compartilhe com facilidade.</h3>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Estruture treinos completos, organize a agenda e envie tudo direto para o app do aluno, em poucos
                cliques.
              </p>
              <div className="bg-[#ccc5b9] rounded-lg p-4 h-32 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Training interface"
                  width={120}
                  height={80}
                  className="object-cover rounded"
                />
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="text-white">
              <h3 className="text-xl font-bold mb-4">Progresso visível, treino após treino.</h3>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                O aluno acompanha seu desempenho com gráficos claros e dados atualizados.
              </p>
              <div className="bg-[#ccc5b9] rounded-lg p-4 h-32 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Progress tracking"
                  width={120}
                  height={80}
                  className="object-cover rounded"
                />
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="text-white">
              <h3 className="text-xl font-bold mb-4">Conecte-se, treine e evolua juntos.</h3>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Mensagens diretas, atualizações de treino e notificações em tempo real para manter o máximo engajamento
                entre treinador e aluno.
              </p>
              <div className="bg-[#ccc5b9] rounded-lg p-4 h-32 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Communication features"
                  width={120}
                  height={80}
                  className="object-cover rounded"
                />
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=200"
                  alt="Mobile app interface"
                  width={200}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
            <div
              className="flex-1 p-8 lg:p-12 rounded-2xl text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #eb5e28 0%, #252422 100%)",
              }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  Compartilhe sua jornada e comemore resultados juntos!
                </h2>
                <p className="text-sm lg:text-base opacity-90 leading-relaxed mb-6">
                  Mostre ao mundo sua batalha e seus resultados, em diversas modalidades, seja musculação, corrida,
                  bike, crossfit e mais...
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <div className="bg-white/20 rounded-lg p-4">
                    <Image
                      src="/placeholder.svg?height=80&width=120"
                      alt="App screenshot"
                      width={120}
                      height={80}
                      className="rounded"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="bg-[#252422] py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Conheça um pouco da nossa plataforma</h2>
          <div className="bg-[#2c2c2c] rounded-2xl p-8 lg:p-16 min-h-[300px] flex items-center justify-center">
            <p className="text-[#777777] text-lg">Platform preview content</p>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-[#252422] mb-4">Faça parte desse time</h3>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 flex justify-center">
              <Image
                src="/placeholder.svg?height=300&width=250"
                alt="Bodybuilder"
                width={250}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 flex justify-center">
              <Card className="w-full max-w-sm">
                <CardContent className="p-6">
                  <div className="h-48 bg-[#f5f5f5] rounded-lg flex items-center justify-center mb-4">
                    <div className="w-full h-2 bg-[#eb5e28] rounded-full"></div>
                  </div>
                  <p className="text-sm text-[#777777] text-center">Performance tracking chart</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
