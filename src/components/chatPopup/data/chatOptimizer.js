import suggestionAnswers from "./suggestionAnswers";

export const findLocalAnswer = (text) => {
  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();

  if (suggestionAnswers.en.exact[cleanText])
    return suggestionAnswers.en.exact[cleanText];
  if (suggestionAnswers.id.exact[cleanText])
    return suggestionAnswers.id.exact[cleanText];

  let lang = "id";
  if (
    lowerText.match(
      /\b(what|how|who|where|is|are|you|your|tell|about|skills|projects|education|hi|hello|morning|afternoon)\b/,
    )
  ) {
    lang = "en";
  }

  if (
    lowerText.match(
      /^(halo|hai|hi|hello|pagi|siang|sore|malam|morning|afternoon)[.!?\s]*$/,
    )
  ) {
    return suggestionAnswers[lang].greeting;
  }

  if (cleanText.length < 60) {
    if (
      lowerText.match(
        /\b(tidak|bukan|jangan|gak|ngga|engga|not|don't|dont|no)\b/,
      )
    ) {
      return null;
    }

    let matchCount = 0;
    let matchedAnswer = null;

    if (
      lowerText.match(
        /\b(skill|skills|kemampuan|keahlian|stack|teknologi|technologies)\b|bisa apa/,
      )
    ) {
      matchCount++;
      matchedAnswer = suggestionAnswers[lang].topics.skills;
    }

    if (
      lowerText.match(
        /\b(project|projects|proyek|portofolio|aplikasi)\b|bikin apa/,
      )
    ) {
      matchCount++;
      matchedAnswer = suggestionAnswers[lang].topics.projects;
    }

    if (
      lowerText.match(
        /\b(pendidikan|education|sekolah|school|kuliah|university|universitas|kampus)\b/,
      )
    ) {
      matchCount++;
      matchedAnswer = suggestionAnswers[lang].topics.education;
    }

    if (
      lowerText.match(
        /\b(role|kerja|posisi|lowongan|karir|job|work)\b|looking for/,
      )
    ) {
      matchCount++;
      matchedAnswer = suggestionAnswers[lang].topics.role;
    }

    if (matchCount === 1) {
      return matchedAnswer;
    }
  }

  return null;
};

export const stripBullets = (text) => {
  return text.replace(/^[-*+]\s+/gm, "");
};
