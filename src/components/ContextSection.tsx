
import { ArticleContext } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookmarkCheck, Calendar, FileText, Link, MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';

interface ContextSectionProps {
  context: ArticleContext;
}

const ContextSection = ({ context }: ContextSectionProps) => {
  return (
    <div className="space-y-6 my-6">
      <section>
        <div className="flex items-center gap-2 mb-3">
          <BookmarkCheck className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">🧵 Summary</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm">{context.summary}</p>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">🔥 Why This Matters</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm">{context.whyItMatters}</p>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">📜 How We Got Here (Timeline)</h3>
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
          <ArrowUp className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">💸 Who Benefits or Loses</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-3">
            {context.stakeholders.map((stakeholder, index) => (
              <li key={index} className="flex flex-col">
                <span className="text-sm font-medium">{stakeholder.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{stakeholder.stake}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">🔍 Different Perspectives</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm">{context.perspectives}</p>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <ArrowDown className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">🔁 Patterns + Loops</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm">{context.patterns}</p>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Link className="text-context-blue" size={18} />
          <h3 className="text-lg font-medium">🛠️ Where Change Can Happen</h3>
        </div>
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm">{context.changePoints}</p>
        </Card>
      </section>
    </div>
  );
};

export default ContextSection;
