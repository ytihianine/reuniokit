"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useReducer } from "react";

import { GenericButton } from "@/src/components/Buttons/GenericButton/GenericButton";
import { hrefBonsReflexes, hrefHome } from "@/src/constants/href";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import styles from "./bons-reflexes.module.scss";
import { STEPS, totalSteps } from "./steps";

const SLIDE_DISTANCE = 150;

type PageMotionCustom = {
  direction: number;
  viewMode: ViewMode;
};

const pageVariants = {
  enter: ({ direction, viewMode }: PageMotionCustom) =>
    viewMode === "advice"
      ? {
          opacity: 0,
        }
      : {
          x: direction > 0 ? SLIDE_DISTANCE : -SLIDE_DISTANCE,
          opacity: 0,
        },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: ({ direction, viewMode }: PageMotionCustom) =>
    viewMode === "advice"
      ? {
          opacity: 0,
        }
      : {
          x: direction > 0 ? -SLIDE_DISTANCE : SLIDE_DISTANCE,
          opacity: 0,
        },
} as const;

type ViewMode = "step" | "question" | "advice";

type BonsReflexesState = {
  stepId: number;
  questionId: number | undefined;
  viewMode: ViewMode;
  direction: number;
};

type BonsReflexesAction =
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "GO_TO_ADVICE" };

const initialState: BonsReflexesState = {
  stepId: 0,
  questionId: undefined,
  viewMode: "step",
  direction: 1,
};

function bonsReflexesReducer(
  state: BonsReflexesState,
  action: BonsReflexesAction,
): BonsReflexesState {
  switch (action.type) {
    case "NEXT_STEP": {
      return {
        ...state,
        direction: 1,
        viewMode: "step",
        questionId: undefined,
        stepId: Math.min(state.stepId + 1, totalSteps - 1),
      };
    }

    case "PREVIOUS_STEP": {
      return {
        ...state,
        direction: -1,
        viewMode: "step",
        questionId: undefined,
        stepId: Math.max(state.stepId - 1, 0),
      };
    }

    case "NEXT_QUESTION": {
      if (state.questionId === undefined) {
        return {
          ...state,
          direction: 1,
          viewMode: "question",
          questionId: 0,
        };
      }

      const totalQuestions = STEPS[state.stepId].questions.length;
      if (state.questionId >= totalQuestions - 1) {
        return {
          ...state,
          direction: 1,
          viewMode: "step",
          questionId: undefined,
          stepId: Math.min(state.stepId + 1, totalSteps - 1),
        };
      }

      return {
        ...state,
        direction: 1,
        viewMode: "question",
        questionId: state.questionId + 1,
      };
    }

    case "PREVIOUS_QUESTION": {
      if (state.questionId === undefined) {
        return {
          ...state,
          direction: -1,
        };
      }

      if (state.viewMode === "advice") {
        return {
          ...state,
          direction: -1,
          viewMode: "question",
        };
      }

      if (state.questionId > 0) {
        return {
          ...state,
          direction: -1,
          viewMode: "question",
          questionId: state.questionId - 1,
        };
      }

      return {
        ...state,
        direction: -1,
        viewMode: "step",
        questionId: undefined,
        stepId: Math.max(state.stepId - 1, 0),
      };
    }

    case "GO_TO_ADVICE": {
      return {
        ...state,
        direction: -1,
        viewMode: "advice",
      };
    }

    default:
      return state;
  }
}

type ProgressSectionProps = {
  viewMode: ViewMode;
  stepId: number;
  questionId?: number;
};

function ProgressSection({
  viewMode,
  stepId,
  questionId,
}: ProgressSectionProps) {
  if (viewMode !== "step") {
    const totalQuestions = STEPS[stepId].questions.length;
    const activeQuestionIndex = questionId ?? 0;

    return (
      <div className={styles.progressSection}>
        <div className={styles.progressBar}>
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <div
              key={index}
              className={`${styles.progressSegment} ${
                index <= activeQuestionIndex
                  ? styles.progressSegmentActiveQuestion
                  : ""
              }`}
            />
          ))}
        </div>
        <div className={styles.stepInfo}>
          <span className={styles.stepCount}>
            <strong>Étape {stepId + 1}</strong> - Question{" "}
            {activeQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.progressSection}>
      <div className={styles.progressBar}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`${styles.progressSegment} ${
              index <= stepId ? styles.progressSegmentActive : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

type QuestionPanelProps = {
  title: string;
  content: React.ReactNode;
  showChoiceButtons: boolean;
  skipLabel?: string;
  askingAdviceLabel?: string;
  onSkip: () => void;
  onAskAdvice: () => void;
};

function QuestionPanel({
  title,
  content,
  showChoiceButtons,
  skipLabel,
  askingAdviceLabel,
  onSkip,
  onAskAdvice,
}: QuestionPanelProps) {
  return (
    <div className={styles.questionContent}>
      <h2 className={styles.questionTitle}>{title}</h2>

      <div className={styles.highlight}>
        <div className={styles.highlightBorder} />
        <div className={styles.highlightText}>{content}</div>
      </div>

      {showChoiceButtons && (skipLabel || askingAdviceLabel) && (
        <div className={styles.choiceButtons}>
          {skipLabel && (
            <GenericButton
              className={styles.choiceButton}
              onClick={onSkip}
              tint="dark"
            >
              {skipLabel}
            </GenericButton>
          )}
          {askingAdviceLabel && (
            <GenericButton
              className={styles.choiceButton}
              onClick={onAskAdvice}
              tint="dark"
            >
              {askingAdviceLabel}
            </GenericButton>
          )}
        </div>
      )}
    </div>
  );
}

type StepProps = {
  header?: string;
  title: string;
  content: React.ReactNode;
  image?: React.ReactNode;
  ctaLabel?: string;
  onStart: () => void;
};

function StepPanel({
  header,
  title,
  content,
  image,
  ctaLabel,
  onStart,
}: StepProps) {
  return (
    <div className={styles.content}>
      {header && <h1 className={styles.mainTitle}>{header}</h1>}
      <h2 className={styles.subtitle}>{title}</h2>
      {image && <div className={styles.illustration}>{image}</div>}
      <div className={styles.textContent}>{content}</div>
      {ctaLabel && (
        <GenericButton priority="tertiary" size="large" onClick={onStart}>
          {ctaLabel}
        </GenericButton>
      )}
    </div>
  );
}

type NavigationPanelProps = {
  viewMode: ViewMode;
  stepId: number;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
};

function NavigationPanel({
  viewMode,
  stepId,
  onPreviousQuestion,
  onNextQuestion,
  onPreviousStep,
  onNextStep,
}: NavigationPanelProps) {
  if (viewMode !== "step") {
    return (
      <div className={styles.navigation}>
        <GenericButton
          priority="tertiary no outline"
          iconId="fr-icon-arrow-left-line"
          iconPosition="left"
          size="large"
          tint="dark"
          onClick={onPreviousQuestion}
        >
          Précédent
        </GenericButton>
        <GenericButton
          priority="tertiary no outline"
          iconId="fr-icon-arrow-right-line"
          iconPosition="right"
          size="large"
          tint="dark"
          onClick={onNextQuestion}
        >
          Suivant
        </GenericButton>
      </div>
    );
  }

  return (
    <div className={styles.navigation}>
      {stepId !== 0 ? (
        <GenericButton
          priority="tertiary no outline"
          iconId="fr-icon-arrow-left-line"
          iconPosition="left"
          size="large"
          tint="light"
          onClick={onPreviousStep}
        >
          Étape précédente
        </GenericButton>
      ) : (
        <div />
      )}

      {stepId !== totalSteps - 1 && (
        <GenericButton
          priority="tertiary no outline"
          iconId="fr-icon-arrow-right-line"
          iconPosition="right"
          size="large"
          tint="light"
          onClick={onNextStep}
        >
          Étape suivante
        </GenericButton>
      )}
    </div>
  );
}

export default function BonsReflexes() {
  const [{ stepId, questionId, viewMode, direction }, dispatch] = useReducer(
    bonsReflexesReducer,
    initialState,
  );

  const shouldReduceMotion = useReducedMotion();

  const step = STEPS[stepId];
  const question =
    questionId === undefined ? undefined : step.questions[questionId];
  const advice = question?.advice;

  const pageKey = `${viewMode}-${stepId}-${questionId ?? "none"}`;
  const wrapperBackgroundColor =
    viewMode === "step"
      ? "var(--bons-reflexes-bg-step)"
      : "var(--bons-reflexes-bg-form)";

  const goToNextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const goToPreviousStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const goToNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const goToPreviousQuestion = () => {
    dispatch({ type: "PREVIOUS_QUESTION" });
  };

  const goToAdvice = () => {
    dispatch({ type: "GO_TO_ADVICE" });
  };

  return (
    <>
      <Breadcrumb
        currentPageLabel={step.title}
        homeLinkProps={{ href: hrefHome }}
        segments={[
          {
            label: "Bons réflexes",
            linkProps: { href: hrefBonsReflexes },
          },
        ]}
      />

      <motion.div
        className={`${styles.fullWidthWrapper} ${
          viewMode !== "step" ? styles.phaseForm : styles.phaseIntro
        }`}
        initial={false}
        animate={{ backgroundColor: wrapperBackgroundColor }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
      >
        <div className={styles.motionViewport}>
          <AnimatePresence custom={{ direction, viewMode }} mode="wait">
            <motion.div
              key={pageKey}
              custom={{ direction, viewMode }}
              variants={pageVariants}
              initial={shouldReduceMotion ? false : "enter"}
              animate="center"
              exit="exit"
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }
              }
              className={styles.motionPage}
            >
              <div className={styles.container}>
                <ProgressSection
                  viewMode={viewMode}
                  stepId={stepId}
                  questionId={questionId}
                />

                {viewMode !== "step" && question ? (
                  <QuestionPanel
                    title={
                      (viewMode === "advice" && advice
                        ? advice.title
                        : question?.title) ?? ""
                    }
                    content={
                      viewMode === "advice" && advice
                        ? advice.content
                        : (question?.content ?? null)
                    }
                    showChoiceButtons={!(viewMode === "advice" && advice)}
                    skipLabel={question.skipLabel}
                    askingAdviceLabel={question.askingAdviceLabel}
                    onSkip={goToNextQuestion}
                    onAskAdvice={goToAdvice}
                  />
                ) : (
                  <StepPanel
                    header={step.header}
                    title={step.title}
                    content={step.content}
                    image={step.image}
                    ctaLabel={step.ctaLabel}
                    onStart={goToNextQuestion}
                  />
                )}

                <NavigationPanel
                  viewMode={viewMode}
                  stepId={stepId}
                  onPreviousQuestion={goToPreviousQuestion}
                  onNextQuestion={goToNextQuestion}
                  onPreviousStep={goToPreviousStep}
                  onNextStep={goToNextStep}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
