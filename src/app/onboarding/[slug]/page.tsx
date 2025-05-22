import { OnboardingPage } from '@/views/OnboardingPage';

interface Props {
  params: {
    slug: string;
  };
}

export default function Onboarding({ params }: Props) {
  return <OnboardingPage slug={params.slug} />;
}
