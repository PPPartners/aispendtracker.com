alter table public.waitlist_entries
add column building_description text,
add column used_providers text[], -- Store multiple selections as an array of text
add column tracking_method text,
add column billing_frustration text,
add column team_size text,
add column reasonable_price text,
add column feedback_call_interest text,
add column survey_completed_at timestamp with time zone;

-- Add comments for new columns
comment on column public.waitlist_entries.building_description is 'Q1: What are you building?';
comment on column public.waitlist_entries.used_providers is 'Q2: Which AI providers are you currently using?';
comment on column public.waitlist_entries.tracking_method is 'Q3: How are you currently tracking your AI costs?';
comment on column public.waitlist_entries.billing_frustration is 'Q4: Biggest frustration with AI billing?';
comment on column public.waitlist_entries.team_size is 'Q5: How big is your team?';
comment on column public.waitlist_entries.reasonable_price is 'Q6: Which pricing tier feels most reasonable?';
comment on column public.waitlist_entries.feedback_call_interest is 'Q7: Would you be open to a quick 15-min call?';
comment on column public.waitlist_entries.survey_completed_at is 'Timestamp when the survey was submitted.';
