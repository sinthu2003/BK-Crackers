import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
            Safety Guidelines
          </h1>
          
          <div className="prose prose-lg max-w-none text-garderobe-gray-600">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="font-semibold text-red-700">⚠️ Important Safety Notice</p>
              <p className="text-red-600">Always follow local regulations and safety guidelines when handling fireworks. Adult supervision is mandatory.</p>
            </div>

            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Before Lighting Fireworks</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Read all instructions on the firework packaging carefully</li>
              <li>Choose an open area away from buildings, vehicles, and flammable materials</li>
              <li>Keep a bucket of water or garden hose nearby</li>
              <li>Never use fireworks indoors or in confined spaces</li>
              <li>Check weather conditions - avoid windy conditions</li>
              <li>Wear protective eyewear and keep safe distance</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">During Use</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Light only one firework at a time</li>
              <li>Never hold fireworks in your hand while lighting</li>
              <li>Move away quickly after lighting</li>
              <li>Never lean over fireworks when lighting</li>
              <li>Do not attempt to relight or handle malfunctioning fireworks</li>
              <li>Keep spectators at a safe distance (minimum 5 meters)</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">After Use</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Wait 20 minutes before approaching any firework that didn't ignite</li>
              <li>Soak all used fireworks in water before disposal</li>
              <li>Never pick up firework fragments immediately after use</li>
              <li>Dispose of fireworks properly in accordance with local regulations</li>
              <li>Clean the area thoroughly after use</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Special Precautions for Children</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Children should never handle fireworks without adult supervision</li>
              <li>Keep matches and lighters away from children</li>
              <li>Provide sparklers only to children over 5 years with supervision</li>
              <li>Teach children to drop sparklers in water when finished</li>
              <li>Maintain minimum 10-meter distance for children watching fireworks</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">First Aid</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>For burns: Run cool water over the area for 10-15 minutes</li>
              <li>For eye injuries: Rinse with clean water and seek immediate medical attention</li>
              <li>Keep a first aid kit readily available</li>
              <li>Have emergency contact numbers handy</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Legal Requirements</h2>
            <p className="mb-4">
              Ensure compliance with local laws regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Permitted timings for bursting crackers</li>
              <li>Noise level restrictions</li>
              <li>Authorized areas for firework use</li>
              <li>Age restrictions for purchase and use</li>
            </ul>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-8">
              <p className="font-semibold text-green-700">💚 Environmental Responsibility</p>
              <p className="text-green-600">Choose eco-friendly crackers when possible. Properly dispose of waste. Consider the impact on pets and wildlife.</p>
            </div>
            
            <p className="mt-8 text-sm text-garderobe-gray-500">
              For more information on safety guidelines, contact local authorities or visit www.bkcrackers.com/safety
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}