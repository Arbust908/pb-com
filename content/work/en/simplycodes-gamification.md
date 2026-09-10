---
slug: simplycodes-gamification
translationKey: simplycodes-gamification
locale: en
title: Making random rewards trustworthy at SimplyCodes
description: How I connected server-managed rewards to a multi-stage Lottie reveal, missions, progress, and account activity.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 40
role: Front-end engineer
period: June 2023 to January 2024
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
draft: false
---

## Context

The SimplyCodes team wanted to reward useful shopping behavior beyond submitting coupon codes. Together with our manager, we developed an experience that could recognize purchase-related activity, including a path for users to claim missing Tokens when they had made a purchase without using a SimplyCodes coupon. The wider goal was to give people a reason to return by making earning, progress, and redemption visible.

The product and design teams defined the reward concept and visual design. I implemented and extended the frontend for progress, missions, recent activity, recent wins, token education, and the animated prize reveal.

Once users could exchange Tokens for a random reward, the browser could not decide, reveal early, or reroll the outcome. The interface still had to make the reveal engaging.

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

Animation controls could change when someone saw a result, but not the result itself. Closing, replaying, or skipping the animation did not randomize the reward again.

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

The animation presented state that the server had already recorded. I kept network, modal, animation, and reward state separate. This let the interface block duplicate actions during a request, prevent early transitions, and skip the animation without changing the outcome.

## Building the rest of the reward experience

The prize reveal worked as part of a larger web experience rather than as an isolated game. Over several releases, I connected the service's reward state to the places where users needed context:

- progress toward the next reward, calculated from service-provided milestones;
- Play-page missions with loading and completion states;
- mission calls to action that could open an in-app destination, navigate to another route, open an external link, or record a tracked activity;
- recent account activity and API-backed recent wins;
- purchase-recovery forms that supported claims with or without a coupon;
- token education explaining how Tokens could be earned and redeemed.

I also helped change user-facing language from "Karma" to "Tokens." Dynamic reward values and clearer earning and redemption explanations reduced the economic policy embedded in static interface copy.

`[Image: reward progress, missions, recent activity, and token education shown together]`

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

## Timeline

```text
June 2023       Dynamic economy and progress presentation
August 2023     Missions and action routing
August 2023     Reward selection moved out of browser prototypes
September 2023  Activity, recent wins, and Lottie prize reveal
September 2023  User-facing language moved from Karma to Tokens
January 2024    Expanded token education
```

We first made account state clear, then gave users concrete ways to earn Tokens and connected them to activity and redemption. We added the animation after the server controlled the result.

## Outcome

The frontend let users learn how to earn Tokens, see progress and activity, recover missing purchase credit, spend Tokens, and watch a prize reveal. The presentation could not choose or improve the random result.

The available evidence establishes the implementation and its staged rollout, but not a measurable change in retention, purchase frequency, or redemption. Those claims remain out of scope until cohort and funnel analytics can be recovered.

## Reflection

Virtual progress becomes a systems problem when it has tangible value. The server must control the reward, and the animation must remain optional. A user can skip it and still receive the result already recorded for the transaction.

The contract separated service-owned reward state from client-owned presentation. The service decided what happened. The interface showed that result and responded to the user's actions.
