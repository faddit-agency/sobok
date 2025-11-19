import { useScrollAnimation } from "../hooks/useScrollAnimation"

export function TeamSection() {
  const { ref, isVisible } = useScrollAnimation()

  const teamMembers = [
    {
      name: "Sydney Foster",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Ezra Ko",
      role: "Lead UX Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Ava Thiery",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "Maya Rivera",
      role: "Brand Strategist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
    }
  ]

  return (
    <section 
      ref={ref}
      className={`py-32 px-4 bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Tag */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
            • Our team
          </span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4">
          Unique creatives
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          A small group of designers and engineers working closely together.
        </p>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

