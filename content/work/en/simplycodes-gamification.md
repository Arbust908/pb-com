---
slug: simplycodes-gamification
translationKey: simplycodes-gamification
locale: en
title: Making random rewards trustworthy at SimplyCodes
description: How I connected a server-authoritative reward flow to a multi-stage Lottie reveal and a broader loyalty-oriented web experience.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 40
role: Front-End Engineer
period: June 2023–January 2024
technologies:
  - Nuxt
  - Vue
  - TypeScript
  - Lottie
skills:
  - Front-end architecture
  - State modeling
  - Animation integration
  - Behavioral UX
areas:
  - frontend
  - architecture
  - product
featured: true
draft: true
---

## Context

The SimplyCodes team wanted to reward useful shopping behavior beyond submitting coupon codes. Together with our manager, we developed an experience that could recognize purchase-related activity, including a path for users to claim missing Tokens when they had made a purchase without using a SimplyCodes coupon. The wider goal was to give people a reason to return by making earning, progress, and redemption visible.

The product and design teams shaped the reward concept and its visual personality. My responsibility was implementing and evolving the frontend experience: progress, missions, recent activity, recent wins, token education, and the animated prize reveal.

This was not simply a matter of adding points to the interface. Once Tokens could be exchanged for a randomized reward, the experience had to feel playful without allowing presentation logic to decide, reveal early, or reroll the outcome.

## Designing around authority

An early prototype could choose a bag and cash amount in the browser. That was useful for demonstrating the interaction, but it was not a safe production boundary. Anyone who could inspect or manipulate the client could influence browser-generated randomness.

The production flow treated the reward service as authoritative. A redemption request returned the selected bag and reward amount before the reveal advanced. The client then refreshed the user's balance and history and used the response only to choose the correct presentation.

```text
User spends Tokens
  -> frontend locks the interaction
  -> reward service validates the request
  -> service selects and records the result
  -> frontend receives the bag and amount
  -> balance and history refresh
  -> Lottie reveal presents the recorded result
```

This separation protected an important invariant: animation controls could change how quickly someone saw a result, but not what result they received. Closing, replaying, or skipping presentation was not another chance to randomize the reward.

The remote service remained responsible for balances, eligibility, reward values, and random selection. I did not duplicate those rules in the interface or treat the browser as a second source of truth.

## Turning Lottie files into an interaction

The design team delivered Lottie animations with different moments corresponding to the stages of opening a prize bag. They were not passive videos that could simply play from beginning to end. The interface needed to react at specific points while remaining synchronized with the server result.

I replaced the segmented-video implementation with a Lottie-driven sequence and coordinated it through animation lifecycle and frame events. The interaction initialized the player, entered a looping section while waiting for the user, resumed the reveal on command, and transitioned to the cash result at the intended moment. The bag artwork was selected from the result returned by the service.

```text
Closed bag
  -> opening starts
  -> animation reaches the hold point
  -> middle frames loop
  -> user opens the bag
  -> final frames resume
  -> recorded cash result appears
```

`[Image: the prize-bag sequence from closed state through the Lottie reveal to the cash result]`

The key engineering decision was to model animation as a view over already-authoritative state. Network state, modal state, animation state, and reward state were related, but they were not interchangeable. Keeping those concerns separate made it possible to disable duplicate actions during a request, prevent premature transitions, and support skipping the animation without changing the outcome.

## Building the wider reward journey

The prize reveal worked as part of a larger web experience rather than as an isolated game. Over several releases, I connected the service's reward state to the places where users needed context:

- progress toward the next reward, calculated from service-provided milestones;
- Play-page missions with loading and completion states;
- mission calls to action that could open an in-app destination, navigate to another route, open an external link, or record a tracked activity;
- recent account activity and API-backed recent wins;
- purchase-recovery forms that supported claims with or without a coupon;
- token education explaining how Tokens could be earned and redeemed.

I also helped migrate user-facing language from “Karma” to “Tokens.” This was more than a label replacement: dynamic reward values and clearer earning and redemption explanations reduced the amount of economic policy embedded in static interface copy.

`[Image: reward progress, missions, recent activity, and token education shown as one connected journey]`

## System boundaries

The experience crossed several separately owned layers. The browser orchestrated user intent and presentation; it did not determine whether a mission qualified, how much a purchase earned, or which prize was selected.

```text
SimplyCodes web
  -> display balances, progress, missions, and history
  -> route mission actions
  -> submit purchase-recovery information
  -> request redemption and present its result

SimplyCodes API and reward services
  -> record qualifying activities
  -> validate balances and eligibility
  -> complete missions
  -> select and persist rewards
  -> return authoritative account state
```

That boundary also informed failure handling. The interface exposed loading, empty, completed, insufficient-balance, redeemed, and cash-out states, then refreshed remote data after mutations rather than predicting the resulting balance locally.

## Evolution

```text
June 2023       Dynamic economy and progress presentation
August 2023     Missions and action routing
August 2023     Reward selection moved out of browser prototypes
September 2023  Activity, recent wins, and Lottie prize reveal
September 2023  User-facing language moved from Karma to Tokens
January 2024    Expanded token education
```

This progression mattered. We first made account state legible, then gave users concrete earning paths, then connected those paths to activity and redemption. The animation added delight only after the interaction had a trustworthy authority boundary.

## Outcome

The result was a coherent frontend for a server-managed reward ecosystem. Users could understand how to earn Tokens, see their progress and activity, recover missing purchase credit, spend Tokens, and experience a visually rich reveal whose presentation could not choose a better random result.

The available evidence establishes the implementation and its staged rollout, but not a measurable change in retention, purchase frequency, or redemption. Those claims remain out of scope until cohort and funnel analytics can be recovered.

## Reflection

Gamification becomes a systems problem as soon as virtual progress has tangible value. Delight depends on anticipation, but trust depends on making the server authoritative and the animation disposable. A user should be able to skip every flourish and still receive exactly the result already recorded for the transaction.

The most durable part of this work was therefore not the animation alone. It was the contract between service-owned reward state and client-owned presentation: the service decided what happened, while the interface made that decision understandable, responsive, and enjoyable.
