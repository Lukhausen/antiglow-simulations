/**
 * Explanation steps for the simulation
 */
const explanationSteps = [
  {
    title: "Das Problem: Blendung durch Lichtquellen",
    description: "Sowohl Scheinwerfer des Gegenverkehrs als auch direkte Sonneneinstrahlung können Fahrer vorübergehend blenden und gefährliche Fahrsituationen verursachen. Dies ist besonders problematisch bei modernen LED- und Hochleistungsscheinwerfern sowie bei tief stehender Sonne."
  },
  {
    title: "Augenpositionserkennung",
    description: "Das Kamerasystem erkennt präzise die Position der Augen des Fahrers. Dabei werden zwei wichtige Parameter ermittelt: der exakte Abstand zwischen den Augen und der Kamera sowie der Winkel zwischen Kamera und Augen. Diese Messungen bilden die Grundlage für die spätere Triangulationsberechnung."
  },
  {
    title: "Lichtquellenerkennung",
    description: "Das System erfasst die Position der Lichtquelle (Scheinwerfer oder Sonne) und misst deren Entfernung zur Kamera. Zusammen mit den Daten aus der Augenpositionserkennung - Abstände und Winkel - ermöglicht dies eine präzise Triangulation des Blendungspfads."
  },
  {
    title: "Triangulation des Blendungspfads",
    description: "Durch die ermittelten Abstände (Kamera-Augen und Kamera-Lichtquelle) und den gemessenen Winkel kann das System mittels Triangulation den exakten Pfad der Blendung berechnen. Dies ermöglicht die präzise Bestimmung des Schnittpunkts mit der Windschutzscheibe."
  },
  {
    title: "Berechnung des Schnittpunkts",
    description: "Anhand der Triangulationsdaten wird der exakte Punkt berechnet, an dem der Blendungspfad die Windschutzscheibe durchdringt. Dieser Schnittpunkt ist entscheidend für die präzise Positionierung der Schattenmaske."
  },
  {
    title: "Dynamische LCD-Schattenmaske",
    description: "In der Windschutzscheibe ist ein LCD-Bildschirm eingelassen, auf dem eine präzise Schattenmaske projiziert wird. Diese Maske wird kontinuierlich und in Echtzeit an die Bewegung der Lichtquelle angepasst, um stets optimalen Blendschutz bei maximaler Sicht zu gewährleisten."
  }
];

export default explanationSteps; 