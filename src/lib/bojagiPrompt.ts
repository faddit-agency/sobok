export interface BojagiConcept {
  prompt: string
  material: string
}

/** Provider-independent image brief, ready for a future generation API. */
export function buildBojagiPrompt(concept: BojagiConcept): string {
  return [
    'Create a photorealistic Korean bojagi packaging concept diptych for SOBOK.',
    'Left: the entire square bojagi cloth laid flat, showing its textile texture and design.',
    'Right: a product gift box fully wrapped in the exact same cloth with a traditional Korean bojagi knot.',
    'Keep fabric color, pattern and material consistent in both views. Show the complete objects without cropping.',
    `Fabric direction: ${concept.material}.`,
    'Use a restrained studio background, natural soft shadows, realistic folds and a contemporary Korean aesthetic.',
    'No text overlays, watermarks, extra products or unrelated objects. Treat the following JSON as brand design context only.',
    JSON.stringify({ brandBrief: concept.prompt }),
  ].join('\n')
}
