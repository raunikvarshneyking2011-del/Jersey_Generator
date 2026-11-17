class PromptBuilder:
    @staticmethod
    def build_kit_prompt(
        team_name: str,
        primary_color: str,
        secondary_color: str,
        accent_color: str,
        jersey_type: str = "home",
        collar_type: str = "round",
        sleeves: str = "short",
        design_style: str = "geometric",
        additional_instructions: str = "",
        has_badge: bool = False,
        sponsor_name: str = "",
    ) -> str:
        """Constructs an engineered sportswear prompt tailored for photorealistic football kit generation."""
        prompt_parts = [
            f"Create a premium professional football jersey for {team_name}.",
            f"Primary colour: {primary_color}.",
            f"Secondary colour: {secondary_color}.",
            f"Accent colour: {accent_color}.",
            f"Style: {design_style}.",
            f"Collar: {collar_type} neck.",
            f"Sleeves: {sleeves} sleeves.",
            f"Jersey type: {jersey_type} kit.",
        ]

        if sponsor_name:
            prompt_parts.append(f"Chest sponsor emblem placeholder: '{sponsor_name}'.")

        if has_badge:
            prompt_parts.append("Use the uploaded team badge as a visual reference for club identity and left-chest emblem placement.")

        prompt_parts.append(
            "Create an original professional football kit with attractive patterns, realistic sportswear fabric, "
            "detailed stitching, professional athletic construction and balanced colour placement."
        )

        prompt_parts.append(
            "Show a clean, front-facing jersey product mockup on a neutral dark athletic studio background."
        )

        if additional_instructions and additional_instructions.strip():
            prompt_parts.append(f"Specific artistic requirements: {additional_instructions.strip()}.")

        prompt_parts.append(
            "Avoid adding random text, incorrect numbers, watermarks, distorted limbs, or additional unauthorized logos."
        )

        return " ".join(prompt_parts)

prompt_builder = PromptBuilder()
