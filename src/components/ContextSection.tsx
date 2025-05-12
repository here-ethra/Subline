import { ArticleContext } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Users, Globe, Info, Clock } from 'lucide-react';

interface ContextSectionProps {
  context: ArticleContext;
}

const ContextSection = ({ context }: ContextSectionProps) => {
  return (
    <div className="space-y-6 my-6">
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Info className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">Summary</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm">{context.summary}</p>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">Timeline</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-3">
            {context.timeline.map((item, index) => (
              <li key={index} className="flex">
                <span className="text-xs font-medium text-context-neutral min-w-[100px]">
                  {item.date}
                </span>
                <span className="text-sm ml-4">{item.event}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Users className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">Key Stakeholders</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-3">
            {context.stakeholders.map((stakeholder, index) => (
              <li key={index} className="flex flex-col">
                <span className="text-sm font-medium">{stakeholder.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{stakeholder.role}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Globe className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">Background</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm">{context.background}</p>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">Systems Perspective</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm">{context.systemsPerspective}</p>
        </Card>
      </section>
    </div>
  );
};

export default ContextSection;
