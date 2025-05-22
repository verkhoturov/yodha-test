import { NextResponse } from 'next/server';

import { promises as fs } from 'fs';
import path from 'path';

import { onboardingConfigSchema } from '@/entities/onboarding/model';

type Params = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  const { slug } = params;

  // Абсолютный путь к JSON файлу
  const filePath = path.resolve(process.cwd(), 'onboardings-data', `${slug}.json`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    const result = onboardingConfigSchema.safeParse(jsonData);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Invalid onboarding config structure',
          issues: result.error.format(),
        },
        { status: 500 },
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: `Cannot load config for "${slug}"` }, { status: 404 });
  }
}
