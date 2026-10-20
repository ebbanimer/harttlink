import { AppHeader } from './components/AppHeader';
import { AppNavigation } from './components/AppNavigation';
import { ChatSheet } from './components/ChatSheet';
import { ContentDetail } from './components/ContentDetail';
import { RelationshipForm } from './components/RelationshipForm';
import { TAB_LABELS } from './constants/copy';
import { ExploreScreen } from './screens/ExploreScreen';
import { RelationshipScreen } from './screens/RelationshipScreen';
import { HomeScreen } from './screens/HomeScreen';
import { PartnerShareSheet } from './components/PartnerShareSheet';
import { CalendarScreen } from './screens/CalendarScreen';
import { QuestionInbox } from './components/QuestionInbox';
import { useCloseby } from './state/ClosebyProvider';
export function App() {
  const { tab, detail, chat, form, toast, sharingText, questionInbox } =
    useCloseby();
  return (
    <div className="shell">
      <AppHeader />
      <main key={tab}>
        {tab === TAB_LABELS.home && <HomeScreen />}
        {tab === TAB_LABELS.explore && <ExploreScreen />}
        {tab === TAB_LABELS.relationship && <RelationshipScreen />}
        {tab === TAB_LABELS.calendar && <CalendarScreen />}
      </main>
      <AppNavigation />
      {detail && <ContentDetail />}
      {chat && <ChatSheet />}
      {form && <RelationshipForm key={form} />}
      {sharingText && <PartnerShareSheet key={sharingText} />}
      {questionInbox && <QuestionInbox />}
      {toast && (
        <div role="status" className="toast">
          {toast}
        </div>
      )}
    </div>
  );
}
