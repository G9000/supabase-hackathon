-- Create 2 test users
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES
('00000000-0000-0000-0000-000000000000', uuid_generate_v4(), 'authenticated', 'authenticated', 'user1@example.com', crypt('password123', gen_salt('bf')), current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}', '{}', current_timestamp, current_timestamp, '', '', '', ''),
('00000000-0000-0000-0000-000000000000', uuid_generate_v4(), 'authenticated', 'authenticated', 'user2@example.com', crypt('password123', gen_salt('bf')), current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}', '{}', current_timestamp, current_timestamp, '', '', '', '');

-- Insert corresponding identities for test users
INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
SELECT uuid_generate_v4(), id, format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb, 'email', current_timestamp, current_timestamp, current_timestamp
FROM auth.users;

-- Update public.users table with specific currency and location
UPDATE public.users
SET currency = 'USD', location = 'USA'
WHERE email = 'user1@example.com';

UPDATE public.users
SET currency = 'EUR', location = 'France'
WHERE email = 'user2@example.com';

-- Update public.diet_preferences table with specific dietary needs
-- Assuming you have user_id values corresponding to user1 and user2
UPDATE public.diet_preferences
SET 
    likes = ARRAY['Pizza', 'Burger'],
    dislikes = ARRAY['Salad', 'Soup'],
    allergy = ARRAY['Peanut', 'Shellfish'],
    dietary_requirements = ARRAY['Vegetarian', 'Vegan'],
    organic_preference = true,
    meal_preferences = ARRAY['Breakfast', 'Lunch'],
    cuisine_preference = ARRAY['Italian', 'Japanese'],
    cooking_time_preference = ARRAY['short', 'medium'],
    favorite_ingredients = ARRAY['Chicken', 'Beef']
WHERE user_id = (SELECT id FROM public.users WHERE email = 'user1@example.com');

UPDATE public.diet_preferences
SET 
    likes = ARRAY['Pasta', 'Curry'],
    dislikes = ARRAY['Stew', 'Rice'],
    allergy = ARRAY['Egg', 'Milk'],
    dietary_requirements = ARRAY['Keto', 'Paleo'],
    organic_preference = false,
    meal_preferences = ARRAY['Dinner', 'Snack'],
    cuisine_preference = ARRAY['Chinese', 'Malaysian'],
    cooking_time_preference = ARRAY['long', 'medium'],
    favorite_ingredients = ARRAY['Fish', 'Egg']
WHERE user_id = (SELECT id FROM public.users WHERE email = 'user2@example.com');
