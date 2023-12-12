alter table "public"."diet_preferences" alter column "dietary_needs" set data type character varying[] using "dietary_needs"::character varying[];

alter table "public"."users" drop column "total_spending";

alter table "public"."users" add column "location" character varying;

alter table "public"."users" add column "total_spend" character varying;

-- Create the trigger 'new_user_trigger'
CREATE TRIGGER new_user_trigger
AFTER INSERT ON auth.users 
FOR EACH ROW
EXECUTE FUNCTION create_user_on_sign_up();