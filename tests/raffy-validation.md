# Raffy Test Suite - 50 Production Validation Prompts

Test these prompts in production to validate the chatbot's performance across all categories.

## Category 1: Service Inquiries (10 prompts)

1. "What roofing services do you offer?"
2. "Do you do roof repairs?"
3. "Can you replace my entire roof?"
4. "What's included in a roof inspection?"
5. "Do you offer emergency roofing services?"
6. "Can you install flat roofs?"
7. "Do you do gutter services?"
8. "What types of roofing materials do you work with?"
9. "Do you offer warranty on your work?"
10. "Can you help with storm damage repairs?"

## Category 2: Pricing Questions (10 prompts)

11. "How much does a roof inspection cost?"
12. "What's the average price for roof repair?"
13. "Can you give me a quote for replacing my roof?"
14. "Do you offer free estimates?"
15. "What's your pricing for emergency tarping?"
16. "How much does it cost to replace shingles?"
17. "What are your rates for gutter installation?"
18. "Do you have any current promotions or discounts?"
19. "Is financing available for roof replacement?"
20. "What payment methods do you accept?"

## Category 3: Booking/Scheduling Requests (10 prompts)

21. "I want to book an inspection"
22. "Can I schedule a roof repair for next week?"
23. "How do I set up an appointment?"
24. "When is your earliest available time slot?"
25. "I need someone to come out and look at my roof"
26. "Can you schedule me for an emergency visit?"
27. "I'd like to book a free estimate"
28. "What days are you available for inspections?"
29. "Can I get an appointment this week?"
30. "I want to set up a time for you to come by"

## Category 4: Emergency Situations (5 prompts)

31. "My roof is leaking badly right now!"
32. "Emergency! There's water coming through my ceiling"
33. "I need urgent help with storm damage"
34. "My roof was damaged in yesterday's storm - need immediate help"
35. "Can someone come out ASAP? My roof is falling apart"

## Category 5: Area/Coverage Questions (5 prompts)

36. "Do you service Oshawa?"
37. "Are you available in Whitby?"
38. "What areas do you cover in Durham Region?"
39. "Do you work in Ajax and Pickering?"
40. "How far do you travel for jobs?"

## Category 6: Material/Technical Questions (5 prompts)

41. "What type of shingles do you recommend?"
42. "Do you use architectural or 3-tab shingles?"
43. "What's the difference between flat and sloped roofing?"
44. "How long does a typical roof last?"
45. "What materials are best for the Durham Region climate?"

## Category 7: Timeline Questions (5 prompts)

46. "How long does a roof replacement take?"
47. "How quickly can you complete a repair?"
48. "What's the typical turnaround time for an inspection?"
49. "How long until I get my estimate after the inspection?"
50. "When can you start work if I book today?"

## Expected Behaviors by Intent

### Booking Intent (Prompts 21-30)
- **Expected**: Booking modal should appear
- **Alternative**: Lead form with booking-specific copy

### Emergency Intent (Prompts 31-35)
- **Expected**: Prominent phone CTA should display
- **Message**: Should emphasize urgency and direct them to call

### Quote Intent (Prompts 11-20)
- **Expected**: Lead form should appear
- **Message**: Should offer to provide detailed estimate

### General Inquiry (All others)
- **Expected**: Contextual answer from RAG
- **May show**: Lead form if pricing/booking mentioned in answer

## Testing Checklist

For each prompt, verify:
- [ ] Response is relevant and accurate
- [ ] Response time is < 5 seconds
- [ ] Correct intent detected (check network response)
- [ ] Appropriate UI element shown (lead form/booking modal/emergency CTA)
- [ ] Sources are cited when applicable
- [ ] No hallucinations or made-up information
- [ ] Tone is friendly and professional
- [ ] Grammar and spelling are correct

## Success Criteria

- **Accuracy**: 90%+ prompts receive relevant, correct answers
- **Intent Detection**: 85%+ correct intent detection
- **Response Time**: 95%+ responses under 5 seconds
- **UI Triggers**: 100% correct UI element triggers
- **No Errors**: 0 unhandled errors or crashes

## Notes for Testing

1. Test in incognito/private mode to avoid rate limiting
2. Test across different devices (desktop, mobile, tablet)
3. Document any incorrect or unexpected responses
4. Note any performance issues
5. Check that all links (phone, email) work correctly
6. Verify email notifications are sent for contact form
7. Ensure booking confirmation emails are received
