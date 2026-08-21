---
slug: simplycodes-referral-system
translationKey: simplycodes-referral-system
locale: en
title: Redesigning the two-sided referral journey for SimplyCodes
description: How I reshaped the inviter and invitee experiences around an existing cross-service attribution and rewards pipeline.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 20
role: Lead Front-End Maintainer and Redesign Owner
period: April–July 2024
technologies:
  - Nuxt
  - Vue
  - TypeScript
  - GTM
  - GA4
skills:
  - Product design
  - Front-end architecture
  - Growth engineering
  - Cross-team coordination
areas:
  - frontend
  - architecture
  - product
  - e2e
featured: true
draft: false
---

## Context

SimplyCodes already had the foundations of a referral program: unique invite codes, referral validation, attribution across authentication, activity tracking, and rewards. The web experience did not yet communicate that system as one coherent journey.

As the primary front-end maintainer, I owned the redesign from its initial product idea through implementation. I defined the shape of the inviter and invitee experiences, translated reward mechanics into understandable steps, and coordinated with the backend team so the new journey respected the existing attribution contracts.

The goal was not to replace the referral infrastructure. It was to make that infrastructure legible and useful to both sides of the invitation.

## Two audiences, two questions

A referral flow serves two people with different motivations.

The inviter needs to understand why sharing is worthwhile, where to find their link, how to send it, and whether friends have completed the journey. The invitee arrives with less context. They need to understand who invited them, why they should trust the offer, and what they must do next.

Treating both audiences as one generic acquisition page would have made the program harder to explain. I separated the experience into two connected journeys:

- an inviter page for discovering the program, unlocking a referral code, sharing it, and seeing progress;
- an invitee landing page that turns a shared link into a clear signup, installation, and purchase path.

`[Image: inviter and invitee pages shown side by side on desktop and mobile]`

## Designing the inviter journey

The inviter page adapts to authentication state. Logged-out visitors first see the program explanation and a call to action that returns them to the referral page after login. Logged-in users see their unique link, sharing controls, and completed-referral progress.

Sharing also adapts to the device. On mobile, SMS and the native share sheet are the most direct actions. On desktop, the interface supports copying the link, sharing to X, and composing an email invitation. The email interaction includes validation, pending, success, and failure states rather than treating delivery as an invisible action.

I revised the message for each channel and added source parameters to SMS and X links. This preserved the same referral destination while making the origin of shared traffic visible in the URL. I also retained the site's normal search navigation so the referral experience felt like part of SimplyCodes rather than an isolated campaign page.

The progress presentation shows five visual positions, but the interface alone is not the authority for referral eligibility or reward limits. Those rules belong to the rewards service and its activity configuration.

## Designing the invitee journey

The invitee page had to turn somebody else's recommendation into a credible next step. I organized it around a concise value proposition followed by a device-specific explanation of how to complete the journey.

On mobile, the steps emphasize creating an account, downloading the app, and making a purchase. On desktop, they emphasize account creation, browser-extension installation, shopping with the extension, and activating rewards before purchase. Calls to action appear at the beginning and end of the page, with an additional mobile action alongside the first instructional step.

The page only renders for a guest with a valid referral code. Invalid links and already-authenticated visitors return to the standard discovery experience. For valid invitations, I carried the code into the login URL while the existing referral middleware preserved the attribution context in a cookie. That handoff connected the redesigned page to authentication without asking the user to understand the machinery behind it.

I also revised page metadata and social-share presentation so an invitation remained coherent before the recipient reached the site.

## System boundaries

The complete journey crossed several team-owned services. My scope covered the product concept, responsive web journeys, sharing interactions, referral-aware authentication handoff, metadata, and frontend integration. Existing backend services remained responsible for identity, persistence, qualification, moderation, and rewards.

```text
My frontend scope

Inviter page
  -> retrieve an existing referral code
  -> share /invite/:code
  -> validate the invitee route
  -> preserve referral context
  -> hand the invitee to login

Existing cross-service pipeline

Authentication
  -> create or resolve the SimplyCodes user
  -> pass referrer, referee, and code context to Karma

Karma
  -> store the referral relationship
  -> observe install, signup, and qualifying purchase
  -> apply eligibility and activity rules
  -> create reward activities awaiting moderation
```

This boundary mattered during design. The frontend could explain likely steps and present reward information, but it could not become a second source of truth for qualification or payout rules. Coordination with the backend team kept the user journey aligned with the contracts already responsible for those decisions.

## Implementation decisions

The redesign reused the established referral pipeline instead of introducing another attribution mechanism. Route middleware validated the invite code before rendering the landing page and preserved its referral context. The login handoff included the same code explicitly, keeping the transition understandable and allowing authentication to continue the journey.

Existing analytics distinguished logged-in and logged-out inviter page views, sharing methods, email sends, and invitee landing-page views. My sharing changes added channel information to selected links, but the available evidence does not extend through account creation, installation, qualifying purchase, and reward issuance. For that reason, I am not presenting the page events as a complete acquisition funnel.

Reward communication exposed another important constraint. Incentives can change independently of a frontend release. The wider system provided activity configuration, and the current interface reads some values from it, but campaign copy was not uniformly configuration-driven during the redesign. The durable lesson was to treat incentive language as product data wherever possible and to review any remaining promotional copy when rules change.

## Iteration after the redesign

The first implementation was followed by several focused corrections. I adjusted the invitee navigation after feedback, restored standard search behavior on the inviter page, and revised sharing copy and social presentation as the product message evolved.

These were not changes to attribution itself. They were refinements to trust and continuity: a header that behaved like the rest of the product, messages appropriate to their channel, and a shared preview that accurately introduced the destination.

## Outcome

The result was a coherent two-sided web journey built around the existing referral system. Inviters received device-appropriate ways to share and a clearer view of progress. Invitees received a focused path from recommendation to account creation and product installation. The redesign also established explicit integration boundaries between the frontend, authentication, SimplyCodes API, and Karma services.

The analytics and deployment evidence available for this case study does not establish conversion lift, incremental acquisition, or reward completion rates. Those outcomes remain open until the corresponding funnel dashboards can be recovered and validated.

## Reflection

Referral products are not just link generators. They are trust journeys spanning two users and several systems. The interface has to preserve attribution without exposing technical complexity, explain incentives without turning promotional copy into policy, and remain useful when authentication or qualification happens elsewhere.

Owning the redesign meant shaping that complete experience while respecting where frontend responsibility ended. The strongest solution was not a new referral backend; it was a clearer contract between user intent, interface state, and the services already responsible for making the referral real.
