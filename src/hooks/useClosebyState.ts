import React, { useState } from 'react';
import {
  DAILY_PROMPT_PREFIX,
  STORAGE_KEYS,
  TOAST_DURATION_MS,
} from '../constants/config';
import { prompts } from '../constants/content';
import { COPY } from '../constants/copy';
import {
  initialMemories,
  initialMessages,
  initialPlans,
  initialProfile,
} from '../constants/sampleData';
import type {
  Filter,
  FormKind,
  Item,
  Memory,
  Message,
  Plan,
  Profile,
  Tab,
  QuizEntry,
  QuestionExchange,
  QuizParticipant,
} from '../types';
import { formatMemoryDate, todayKey } from '../utils/dates';
import { usePersist } from './usePersist';
import { useOurSpace } from './useOurSpace';
import { monthDay } from '../utils/ourSpace';
import { SPACE_COPY } from '../constants/ourSpace';
import { migrateProfile } from '../utils/profile';
import { getDemoReply } from '../services/assistant';
import { EXCHANGE_COPY } from '../constants/exchanges';
import { saveQuestionAnswer } from '../utils/exchanges';
export function useClosebyState() {
  const [tab, setTab] = useState<Tab>('Home');
  const [filter, setFilter] = useState<Filter>('All');
  const [detail, setDetail] = useState<Item | null>(null);
  const [step, setStep] = useState(0);
  const [chat, setChat] = useState(false);
  const [sharingText, setSharingText] = useState('');
  const [questionInbox, setQuestionInbox] = useState(false);
  const [questionPerson, setQuestionPerson] = useState<QuizParticipant>('you');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );
  const [exchanges, setExchanges] = usePersist<QuestionExchange[]>(
    STORAGE_KEYS.exchanges,
    [],
  );
  const [form, setForm] = useState<FormKind>('');
  const [toast, setToast] = useState('');
  const [draft, setDraft] = useState('');
  const [photo, setPhoto] = useState('');
  const [editingMemoryIndex, setEditingMemoryIndex] = useState<number | null>(
    null,
  );
  const [planTitle, setPlanTitle] = useState('');
  const [planDate, setPlanDate] = useState(todayKey());
  const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);
  const [quizEntries, setQuizEntries] = usePersist<Record<string, QuizEntry>>(
    STORAGE_KEYS.quizzes,
    {},
  );
  const [appreciationDays, setAppreciationDays] = usePersist<string[]>(
    STORAGE_KEYS.appreciation,
    [],
  );
  const [profile, setProfile] = usePersist<Profile>(
    STORAGE_KEYS.profile,
    initialProfile,
    migrateProfile,
  );
  const [saved, setSaved] = usePersist<string[]>(STORAGE_KEYS.saved, []);
  const [days, setDays] = usePersist<string[]>(STORAGE_KEYS.days, []);
  const [skip, setSkip] = usePersist(STORAGE_KEYS.skip, 0);
  const [messages, setMessages] = usePersist<Message[]>(
    STORAGE_KEYS.messages,
    initialMessages,
  );
  const [memories, setMemories] = usePersist<Memory[]>(
    STORAGE_KEYS.memories,
    initialMemories,
  );
  const [plans, setPlans] = usePersist<Plan[]>(
    STORAGE_KEYS.plans,
    initialPlans,
  );
  const date = todayKey(),
    index = (Math.floor(Date.now() / 86400000) + skip) % prompts.length,
    question = prompts[index],
    qid = DAILY_PROMPT_PREFIX + index,
    done = days.includes(date);
  const ourSpace = useOurSpace(profile, date);
  function notify(message: string) {
    setToast(message);
    setTimeout(() => setToast(''), TOAST_DURATION_MS);
  }
  function bookmark(id: string) {
    setSaved(
      saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id],
    );
    notify(
      saved.includes(id)
        ? COPY.notifications.removed
        : COPY.notifications.saved,
    );
  }
  function share(title: string) {
    setSharingText(title);
  }
  function sendQuestion(
    question: string,
    openCollection = true,
    theme: 'funny' | 'random' | 'cute' = 'funny',
  ) {
    if (!question.trim()) return;
    const id = crypto.randomUUID();
    setExchanges((previous) => [
      {
        id,
        sender: questionPerson,
        theme,
        question: question.trim(),
        createdAt: new Date().toISOString(),
        replies: [],
      },
      ...previous,
    ]);
    setSelectedQuestionId(id);
    setDetail(null);
    setQuestionInbox(openCollection);
    notify(EXCHANGE_COPY.sentQuestion);
  }
  function answerQuestion(exchangeId: string, text: string) {
    if (!text.trim() || !exchanges.some((item) => item.id === exchangeId))
      return false;
    setExchanges((previous) =>
      previous.map((item) =>
        item.id === exchangeId
          ? saveQuestionAnswer(
              item,
              questionPerson,
              text,
              crypto.randomUUID(),
              new Date().toISOString(),
            )
          : item,
      ),
    );
    notify(EXCHANGE_COPY.sentReply);
    return true;
  }

  function open(item: Item) {
    setStep(0);
    setDetail(item);
  }
  function closeForm() {
    setForm('');
    setPhoto('');
    setEditingMemoryIndex(null);
    setPlanTitle('');
    setPlanDate(todayKey());
    setEditingPlanIndex(null);
  }
  function openPlan(day: string, index: number | null = null) {
    setEditingPlanIndex(index);
    setPlanDate(day);
    setPlanTitle(index === null ? '' : plans[index].title);
    setForm('plan');
  }
  function openMemory(index: number | null = null) {
    setEditingMemoryIndex(index);
    setPhoto(index === null ? '' : memories[index].photo);
    setForm('memory');
  }
  function removeMemory(index: number) {
    setMemories((previous) => previous.filter((_, i) => i !== index));
  }
  function sendMessage() {
    if (!draft.trim()) return;
    setMessages((previous) => [
      ...previous,
      { who: 'me', text: draft.trim() },
      { who: 'assistant', text: getDemoReply(draft.trim()) },
    ]);
    setDraft('');
  }
  function removePlan(index: number) {
    setPlans((previous) => previous.filter((_, i) => i !== index));
  }
  function toggleDiscussed() {
    setDays(done ? days.filter((x) => x !== date) : [...days, date]);
    notify(
      done ? COPY.notifications.undiscussed : COPY.notifications.discussed,
    );
  }
  function skipQuestion() {
    setSkip(skip + 1);
    setDays(days.filter((x) => x !== date));
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (form === 'profile') {
      const birthday = String(formData.get('birthday')).trim();
      if (birthday && !monthDay(birthday)) {
        notify(SPACE_COPY.invalidBirthday);
        return;
      }
      setProfile({
        you: String(formData.get('you')),
        partner: String(formData.get('partner')),
        since: String(formData.get('since')),
        birthday: String(formData.get('birthday')),
        likes: String(formData.get('likes')),
        story: String(formData.get('story')),
      });
    } else if (form === 'plan') {
      const plan: Plan = {
        title: String(formData.get('title')).trim(),
        date: String(formData.get('date')),
        time: String(formData.get('time') ?? ''),
        notes: String(formData.get('notes') ?? '').trim(),
      };
      if (!plan.title) return;
      setPlans((previous) =>
        editingPlanIndex === null
          ? [...previous, plan]
          : previous.map((existing, index) =>
              index === editingPlanIndex ? plan : existing,
            ),
      );
    } else {
      const occurredOn = String(formData.get('occurredOn') ?? '');
      const previous =
        editingMemoryIndex === null ? undefined : memories[editingMemoryIndex];
      const memory: Memory = {
        title: String(formData.get('title')).trim(),
        date: occurredOn
          ? new Date(occurredOn + 'T12:00:00').toLocaleDateString('en', {
              month: 'long',
              year: 'numeric',
            })
          : (previous?.date ?? formatMemoryDate()),
        occurredOn: occurredOn || undefined,
        note: String(formData.get('note')).trim(),
        photo: String(formData.get('photo') || ''),
        emoji: previous?.emoji ?? '✨',
        kind: formData.get('kind') === 'milestone' ? 'milestone' : 'memory',
      };
      if (!memory.title) return;
      setMemories((existing) =>
        editingMemoryIndex === null
          ? [memory, ...existing]
          : existing.map((item, index) =>
              index === editingMemoryIndex ? memory : item,
            ),
      );
    }
    closeForm();
    notify(COPY.notifications.updated);
  }
  const years = Math.max(
    0,
    Math.floor(
      (Date.now() - new Date(profile.since).getTime()) / (365.25 * 86400000),
    ),
  );

  return {
    ...ourSpace,
    editingMemoryIndex,
    openMemory,
    removeMemory,
    tab,
    setTab,
    filter,
    setFilter,
    detail,
    setDetail,
    step,
    setStep,
    chat,
    setChat,
    form,
    setForm,
    toast,
    profile,
    saved,
    days,
    skip,
    messages,
    memories,
    plans,
    date,
    question,
    qid,
    done,
    years,
    draft,
    setDraft,
    photo,
    setPhoto,
    planTitle,
    setPlanTitle,
    notify,
    bookmark,
    share,
    open,
    submit,
    closeForm,
    sendMessage,
    removePlan,
    toggleDiscussed,
    skipQuestion,
    quizEntries,
    setQuizEntries,
    appreciationDays,
    setAppreciationDays,
    planDate,
    editingPlanIndex,
    openPlan,
    sharingText,
    setSharingText,
    questionInbox,
    setQuestionInbox,
    questionPerson,
    setQuestionPerson,
    selectedQuestionId,
    setSelectedQuestionId,
    exchanges,
    sendQuestion,
    answerQuestion,
  };
}
