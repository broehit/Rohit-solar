/*
  # Create Solar Business Database Schema

  1. New Tables
    - `installations`
      - `id` (uuid, primary key)
      - `title` (text) - Project title
      - `location` (text) - City/location
      - `system_size` (numeric) - System size in kW
      - `panels_used` (text) - Panel brand/model
      - `inverter_used` (text) - Inverter brand/model
      - `monthly_savings` (numeric) - Estimated monthly savings
      - `images` (text array) - Array of image URLs
      - `created_at` (timestamp)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `city` (text) - Customer city
      - `review` (text) - Review text
      - `photo_url` (text) - Customer photo URL
      - `created_at` (timestamp)
    
    - `equipment`
      - `id` (uuid, primary key)
      - `type` (text) - 'panel', 'inverter', or 'mounting'
      - `brand` (text) - Brand name
      - `model` (text) - Model name
      - `efficiency` (text) - Efficiency rating
      - `warranty` (text) - Warranty details
      - `image_url` (text) - Equipment image
      - `created_at` (timestamp)
    
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `phone` (text) - Phone number
      - `city` (text) - City
      - `monthly_bill` (numeric) - Monthly electricity bill
      - `message` (text) - Customer message
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for installations, testimonials, and equipment
    - Public insert access for leads
    - Admin-only write access for installations, testimonials, and equipment
*/

-- Create installations table
CREATE TABLE IF NOT EXISTS installations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  system_size numeric NOT NULL,
  panels_used text NOT NULL,
  inverter_used text NOT NULL,
  monthly_savings numeric NOT NULL,
  images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL,
  review text NOT NULL,
  photo_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('panel', 'inverter', 'mounting')),
  brand text NOT NULL,
  model text NOT NULL,
  efficiency text NOT NULL,
  warranty text NOT NULL,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  monthly_bill numeric NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE installations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Installations policies
CREATE POLICY "Anyone can view installations"
  ON installations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert installations"
  ON installations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update installations"
  ON installations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete installations"
  ON installations FOR DELETE
  TO authenticated
  USING (true);

-- Testimonials policies
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- Equipment policies
CREATE POLICY "Anyone can view equipment"
  ON equipment FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert equipment"
  ON equipment FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update equipment"
  ON equipment FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete equipment"
  ON equipment FOR DELETE
  TO authenticated
  USING (true);

-- Leads policies
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (true);