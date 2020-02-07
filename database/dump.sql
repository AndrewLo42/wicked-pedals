--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    email text,
    phone integer,
    "expirationDate" text,
    ccv smallint
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    brand text,
    "pedalType" text,
    "productType" text
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt", email, phone, "expirationDate", ccv) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription", brand, "pedalType", "productType") FROM stdin;
1	Avalanche Run	29999	/images/avalancherun.jpg	The EarthQuaker Avalanche Run V2 Stereo Reverb & Delay Pedal with Tap Tempo was developed to take floating ambient tones to the next level.	The Avalanche Run is a dreamy sonic discovery device with up to 2 seconds of delay time and a lush stereo reverb. It features complete control over delay time, repeats, mix and voice (with the tone control), as well as control over the reverb length and mix. It can run in one of 3 different modes: Normal, Reverse and Swell. In “Normal” mode, the Avalanche Run functions as a straightforward delay and reverb. In “Reverse” mode, the delay line is in reverse and the reverb remains in normal mode. In “Swell” mode, the Avalanche Run reacts to your picking dynamics and adds a volume swell to the entire signal path much like manually raising and lowering the volume of your guitar. The EarthQuaker Avalanche Run V2 Stereo Reverb & Delay Pedal with Tap Tempo features an expression jack that can be assigned to one of six different controls using the “EXP” selector switch. It also features Tap Tempo with six different ratios accessed via the “Ratio” selector switch. The Avalanche Run can also be run in “True Bypass” mode or “Buffered Bypass” mode for trails and features 5 different tail lengths including “Infinite” for lo-fi and continuously degrading pseudo-looping.	EarthQuaker	Reverb	Pedal
2	Plumes	9999	/images/plumes.jpg	Armed with JFET op-amps, this high-headroom OD is chock-full of chime and clarity.	Many overdrives are a one-trick pony, but not Plumes — its three clipping modes make it one of the most versatile OD stompboxes out there. Mode 1 offers symmetrical LED clipping, supplying you with loads of crunch and compression. This is a great setting for down-and-dirty rock ‘n’ roll tones. Mode 2 is a wide-open op-amp clean boost. This setting dispenses with the soft-clipping diodes altogether, leaving you with a straight op-amp drive that’s perfect for pushing your clean amp into restrained breakup. Mode 3 is an asymmetrical silicon diode arrangement that produces a familiar-sounding drive, but with more clarity and transparency. Plumes covers a lot of ground in a lot of situations; but when we ran it through its paces here at Sweetwater, we found that it works its best magic in front of a dirty amp.	EarthQuaker	Overdrive	Pedal
3	Tube Screamer	8499	/images/tubescreamer.jpg	 Tone, drive, and level controls give you access to warm, amp-like overdrive that's touch sensitive and ready to rip.	The Ibanez TS9DX Overdrive guitar effect pedal is a straightforward design for a guitar effect pedal. While the Ibanez guitar effect pedal does not include a number of bells and whistles, it is a classic style that continues to be successful. The Ibanez guitar effect pedal includes a classic tube style screamer. In addition to the classic style, the pedal includes three settings for better sound choices. The Ibanez TS9DX Overdrive guitar effect pedal includes three settings, featuring hot, turbo, and increased low end crunch. The guitar effect pedal includes a power supply need of a 9-volt battery or from an AC adaptor. The dimensions of the Ibanez guitar effect pedal are 4.88 inches deep by 2.91 inches wide by 2.09 inches tall. The guitar effect pedal weighs 1.26 lbs. This Ibanez guitar effect pedal is designed to offer the best sound effects without too many overwhelming controls, features, or options.	Ibanez	Overdrive	Pedal
4	Soul Food	8999	/images/soulfood.jpg	The Soul Food delivers transparent overdrive with great touch and response. A perfect Klon clone for any guitarist!	Tone aficionados kept telling EHX’s Mike Matthews about a pedal that had achieved a lot of buzz because it was only obtainable at an exorbitant price. That pedal was the KLON CENTAUR. A believer in bringing great tools to starving musicians, Mike tasked his trusty team to create an affordable alternative, and that is how the SOUL FOOD was cooked up.The SOUL FOOD delivers transparent overdrive with great touch and response. Its circuitry features boosted power rails to provide abundant headroom and increased definition. Best of all, you don’t have to be a rock star to own one!Features:Transparent overdriveBoosted power rails for extended headroom and definitionSuper responsiveCompact, rugged designSelectable true bypass or buffered bypass modes9.6DC-200 power supply included. Also runs on 9 Volt battery (Not included)Order your Electro-Harmonix Soul Food Distortion/Fuzz/Overdrive Pedal from Sam Ash Direct today with the security of our 45/60 day return/price protection policy, and be sure to take advantage of our fast, free shipping.	Electro-Harmonix	Overdrive	Pedal
5	Holy Grail	7999	/images/holygrail.jpg	Divine reverb for mere mortals. Down from the heavens comes the Holy Grail, a compact digital reverb guitar pedal that is priced so low thou shalt not covet thy neighbor's reverb tank any longer.	The Holy Grail is Digital Reverb in a compact guitar pedal. It contains three different reverb algorithms: SPRING, HALL, and FLERB. All three algorithms were designed and tailored for the electric guitar but they will work equally as well on most instruments and voices. The SPRING algorithm is a recreation of the classic spring reverbs that are found in many guitar amplifiers. The HALL algorithm is a new, lush reverb. Finally FLERB is a beautiful reverb like nothing you have heard before and may help you play your instruments in new ways. Connect your instrument into the INPUT jack and your amp into the OUTPUT jack. Plug the DC adaptor into the US96DC-200BI jack and then plug the DC adaptor into a wall outlet.	Electro-Harmonix	Reverb	Pedal
6	Miku Stomp	69999	/images/miku.jpg	Hatsune Miku sings when you play your guitar!	Miku singles according to the guitar! MIKU STOMP is a compact effector for guitar singing by Miku Hatsune according to the input guitar sound. Just by connecting your guitar, you can easily make it to Hatsune Miku. The core of the sound synthesis technology is "eVocaloid ^ " by Yamaha's new generation sound source NSX-1. You can enjoy playing Hatsune Miku easily expressing expression with the playing style unique to guitar different from driving and keyboard.	Korg	Filter	Pedal
7	POG 2	24999	/images/pog2.jpg	Easy to use yet packed with features, this polyphonic octave generator expands the capabilities of electric guitars.	The POG2 is based on the original POG polyphonic octave pedal EHX released more than a decade ago, which earned worldwide acclaim due to its versatility and performance. Now with more options, this pedal by EHX allows you to create sonic landscapes of epic complexity with a single pedal. From 12-string guitars and orchestral walls of sound to dreamy swells and arpeggios, the Electro-Harmonix POG2 can do it all.The POG2 includes a wide array of functions you can use simultaneously to create the sound you want. First, you can add one and two octaves up to your instrument’s voice as well as one and two octaves down with independent sliders for full control of the resulting voice. A slider for the dry signal of your guitar is also included for a total of five independent controls. The resulting octave mix can make your guitar sound like a simple bass, a bright synth, a five-layered symphonic wall, and anything in between. The possibilities are endless.Adding to this signature functionality, this Electro-Harmonix polyphonic octave generator includes three powerful effects, each with an independent slider for full control of each one. The attack effect acts as a gradual delay for string picking or plucking action and is great for long swells and reverse-like sounds. The low-pass filter slider controls the cutoff frequency for further control of the tone and warmth of the resulting voice mix, which is great for imitating other instruments. Lastly, using the detune slider results in an interesting effect that is reminiscent of chorus and reverb, adding extra thickness to the audio signal.A bright LED at the top of the unit indicates the active combination of these effects, controlled via the dry FX adjacent button that cycles through them. Below, the Q button controls the resonance of the low-pass filter effect, dramatically changing the tonal quality for enhanced versatility.On the right side of the pedal’s face, the presets module allows you to edit the default sounds or create your own combinations of settings for long-term storage and quick recall. Up to eight presets can be customized and stored in the unit’s memory. Cycle through your presets effortlessly with the left footswitch.\\	Electro-Harmonix	Filter	Pedal
8	Cry Baby Wah	9999	/images/crybaby.jpg	You can get the classic wah howl that artists such as Jimi Hendrix and Eric Clapton loved in the 60s. This guitar effects petal can be an essential addition to your guitar gear.	The Dunlop Cry Baby Wah was one of the company’s original wahs. Although its sound was modeled after the Vox Cry Baby pedal, the Dunlop version quickly became the leader due to its excellent sound. It can create a rhythmic, slightly funky wah effect that appears on many famous recordings. Dunlop has also released several artist signature versions of the classic pedal, including the JH-1 Jimi Hendrix Signature, SW-95 Slash Signature, and ZW-45 Zakk Wylde Signature. Wah-wah can be an excellent effect to add to your guitar gear. This type of pedal bends the tone of your instrument, imitating the sound you make when you say “wah-wah.” Although it was originally intended to mimic the sound of a mute in a trumpet bell, the wah pedal developed its own characteristic howl. Wah pedals can work best in solos and lead guitar riffs. The Dunlop GCB95 Cry Baby wah pedal includes high quality electronics that can keep it sounding great through years of use. It features a Hot Potz potentiometer which can bend pitches with amazing response times. It features both a power adapter input and a battery connection, which can let you choose how you power the device. If you are near a power source, simply plug in the AC adapter. If you want to keep your stage clear of extra cables, you can add a 9-volt battery. The pedal includes a bypass switch, so you can turn it on and off while you continue to play. This effect’s inductor can help produce its classic analog sound. It can be easy to set up and start using the Dunlop Cry Baby wah pedal. You can simply add a power source, plug a guitar into the input connection, and connect the output to a guitar amp.	Dunlop	Filter	Pedal
9	Patch Cable	599	/images/pancakepatch.jpg	This cable is designed to interconnect electric guitar pedal effects. Low-profile, right-angle plugs allow close spacing of pedal effects on pedalboards.	• Serviceable, all-metal plugs for live-sound applications\r\n• Oxygen-Free Copper (OFC) conductor for enhanced signal clarity\r\n• OFC spiral shield for effective EMI and RFI rejection and flexibility	Hosa	\N	Supply
10	Pedal Power	16999	/images/pedalpower.jpg	The voodoo lab pedal power 2 is compatible with all battery guitar pedal effects. It has short circuit protection and comes with isolated outputs which you can combine and create more then 18V. 	The Voodoo Lab Pedal Power 2 Plus is a universal power supply for all battery-operated guitar pedal effects. New features include two outputs that will power Line 6 modeling pedals and two outputs that can have a variable voltage sag to emulate dying carbon batteries. Like the original Pedal Power, each of its eight outputs are completely isolated, short-circuit protected, regulated, and highly filtered. The Pedal Power 2 Plus comes complete with cables and a detachable AC power cord; it is handmade in the US and carries a 5-year warranty.	Voodoo Lab	\N	Supply
11	Hall of Fame	19999	/images/hof.jpg	The revolutionary MASH technology adds the rich and fluid articulation of an expression pedal to your reverb effects in the same compact stompbox that you know.	You can control pretty much any parameter conceivable with MASH. With the TonePrint Editor you can unleash the expressive potential in MASH any way you like. Of course, you can still get all the iconic reverbs and TonePrints that you know from the original.	TC Electronic	Reverb	Pedal
12	Tortex Picks	399	/images/picks.jpg	Dunlop 418P.73 Tortex Standard .73mm Yellow Guitar Picks 12-Pack	Dunlop guitar picks are a top choice of today's pro musician! Dunlop's wide variety of gauges, shapes, sizes and materials allows the player to select the exact pick for his/her own particular style of playing. From classic country to nu-metal, every great player knows that their pick is an integral part of their tone, and Dunlop guitar picks are the picks that more pros rely on in the studio or on stage. Picks are a grossly underrated accessory. Don't sacrifice your tone...pick Dunlop guitar picks! This package of 418P-73 picks contains 12 yellow Tortex picks.	Dunlop	\N	Supply
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 1, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 1, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
