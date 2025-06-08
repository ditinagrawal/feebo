import {
  BarChart3,
  Clock,
  MessageSquare,
  Settings2,
  ThumbsUp,
  Zap,
} from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-20" id="features">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            Build products your users will love
          </h2>
          <p>
            Stop guessing what your users want. Feebo helps you make data-driven
            decisions by collecting and organizing user feedback in one place.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4" />
              <h3 className="text-sm font-medium">Feedback Collection</h3>
            </div>
            <p className="text-sm">
              Easily gather feedback from your users with a simple link.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="size-4" />
              <h3 className="text-sm font-medium">Feature Voting</h3>
            </div>
            <p className="text-sm">
              Let users vote on feature requests to understand what matters most
              to them.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              <h3 className="text-sm font-medium">Analytics</h3>
            </div>
            <p className="text-sm">
              Get insights into user preferences and track feature request
              trends.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <h3 className="text-sm font-medium">Time-Saving</h3>
            </div>
            <p className="text-sm">
              Automate feedback collection and analysis to focus on building.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Settings2 className="size-4" />
              <h3 className="text-sm font-medium">Customization</h3>
            </div>
            <p className="text-sm">
              Customize the look and feel of your feedback portal to match your
              brand.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Quick Setup</h3>
            </div>
            <p className="text-sm">
              Get started in minutes with our easy-to-use interface and
              ready-to-use feedback boards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
