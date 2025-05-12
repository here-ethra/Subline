
import { ArticleContext, ChangePoint } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookmarkCheck, Calendar, FileText, Link, MessageSquare, ArrowUp, ArrowDown, Globe, Users } from 'lucide-react';

interface ContextSectionProps {
  context: ArticleContext;
}

const ContextSection = ({ context }: ContextSectionProps) => {
  // Helper function to render changePoints regardless of format
  const renderChangePoints = () => {
    if (!context.changePoints) {
      return <p className="text-sm">No change points available.</p>;
    }
    
    if (typeof context.changePoints === 'string') {
      return <p className="text-sm">{context.changePoints}</p>;
    }
    
    return (
      <ul className="space-y-3">
        {context.changePoints.map((point: ChangePoint, index: number) => (
          <li key={index} className="flex flex-col">
            <span className="text-sm font-medium">{point.area}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {point.explanation}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6 my-6 animate-in slide-in-from-bottom-4 duration-500">
      <section>
        <div className="flex items-center gap-2 mb-3">
          <BookmarkCheck className="text-[#7aff62]" size={18} />
          <h3 className="text-lg font-medium">Summary</h3>
        </div>
        <Card className="p-4 bg-black backdrop-blur shadow-sm border border-gray-800">
          <p className="text-sm">{context.summary}</p>
        </Card>
      </section>

      <Separator className="dark:bg-gray-700"/>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="text-[#7aff62]" size={18} />
          <h3 className="text-lg font-medium">Why This Matters</h3>
        </div>
        <Card className="p-4 bg-black backdrop-blur shadow-sm border border-gray-800">
          <p className="text-sm">{context.whyItMatters}</p>
        </Card>
      </section>

      <Separator className="dark:bg-gray-700"/>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="text-[#7aff62]" size={18} />
          <h3 className="text-lg font-medium">How We Got Here (Timeline)</h3>
        </div>
        <Card className="p-4 bg-black backdrop-blur shadow-sm border border-gray-800">
          <ul className="space-y-3">
            {context.timeline.map((item, index) => (
              <li key={index} className="flex">
                <span className="text-xs font-medium text-gray-400 min-w-[100px]">
                  {item.date}
                </span>
                <span className="text-sm ml-4">{item.event}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Separator className="dark:bg-gray-700"/>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Users className="text-[#7aff62]" size={18} />
          <h3 className="text-lg font-medium">Who Benefits or Loses</h3>
        </div>
        <Card className="p-4 bg-black backdrop-blur shadow-sm border border-gray-800">
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

      <Separator className="dark:bg-gray-700"/>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="text-[#7aff62]" size={18} />
          <h3 className="text-lg font-medium">Different Perspectives</h3>
        </div>
        <Card className="p-4 bg-black backdrop-blur shadow-sm border border-gray-800">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-1">Main Stakeholders</h4>
              <p className="text-xs">{context.perspectives.mainStakeholders}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Expert Analysis</h4>
              <p className="text-xs">{context.perspectives.experts}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Public Opinion</h4>
              <p className="text-xs">{context.perspectives.publicOpinion}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Critics</h4>
              <p className="text-xs">{context.perspectives.critics}</p>
            </div>
          </div>
        </Card>
      </section>

      <Separator className="dark:bg-gray-700"/>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Globe className="text-[#7aff62]" size={18} />
          <h3 className="text-lg font-medium">Global Context</h3>
        </div>
        <Card className="p-4 bg-black backdrop-blur shadow-sm border border-gray-800">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-1">Similar Case</h4>
              <p className="text-xs">{context.globalContext.similarCase}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">How It Was Resolved</h4>
              <p className="text-xs">{context.globalContext.resolution}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Key Lessons</h4>
              <p className="text-xs">{context.globalContext.lessons}</p>
            </div>
          </div>
        </Card>
      </section>

      <Separator className="dark:bg-gray-700"/>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <ArrowDown className="text-[#7aff62]" size={18} />
          <h3 className="text-lg font-medium">Patterns + Loops</h3>
        </div>
        <Card className="p-4 bg-black backdrop-blur shadow-sm border border-gray-800">
          <p className="text-sm">{context.patterns}</p>
        </Card>
      </section>

      <Separator className="dark:bg-gray-700"/>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Link className="text-[#7aff62]" size={18} />
          <h3 className="text-lg font-medium">Where Change Can Happen</h3>
        </div>
        <Card className="p-4 bg-black backdrop-blur shadow-sm border border-gray-800">
          {renderChangePoints()}
        </Card>
      </section>
    </div>
  );
};

export default ContextSection;
