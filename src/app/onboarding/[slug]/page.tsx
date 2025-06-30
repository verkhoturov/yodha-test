import { OnboardingPage } from '@/views/OnboardingPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Onboarding({ params }: Props) {
  const { slug } = await params;
  return <OnboardingPage slug={slug} />;
}
