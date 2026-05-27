const CardShowcase = () => {

  return (

    <section
      className="
        w-full
        py-24
        px-6
        bg-gradient-to-b
        from-white
        to-[#f5f3ff]
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >

        {/* LEFT */}
        <div>

          <p
            className="
              text-[#7c3aed]
              font-bold
              uppercase
              tracking-[4px]
              mb-4
            "
          >
            Modern Digital Identity
          </p>

          <h2
            className="
              text-5xl
              font-black
              leading-tight
              text-[#0f172a]
            "
          >
            Share Your
            <span className="text-[#7c3aed]">
              {" "}Digital Business Card
            </span>
            {" "}Anywhere.
          </h2>

          <p
            className="
              mt-6
              text-lg
              text-slate-600
              leading-relaxed
            "
          >
            Build stunning digital profiles,
            social links, QR cards, lead capture
            forms, and professional networking
            experiences with Jio Tap.
          </p>

          <div
            className="
              mt-10
              flex
              gap-5
              flex-wrap
            "
          >

            <button
              className="
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-[#7c3aed]
                to-[#ec4899]
                text-white
                font-bold
                shadow-xl
                hover:scale-105
                duration-300
              "
            >
              Create Your Card
            </button>

            <button
              className="
                px-8
                py-4
                rounded-2xl
                border-2
                border-[#7c3aed]
                text-[#7c3aed]
                font-bold
                hover:bg-[#7c3aed]
                hover:text-white
                duration-300
              "
            >
              Explore Features
            </button>

          </div>

        </div>

        {/* RIGHT CARD */}
        <div
          className="
            flex
            justify-center
          "
        >

          <div
            className="
              w-[360px]
              rounded-[36px]
              overflow-hidden
              shadow-2xl
              bg-white
              border
              border-white/50
              backdrop-blur-xl
            "
          >

            {/* COVER */}
            <div
              className="
                h-48
                relative
              "
            >

              <img
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"
                alt=""
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            </div>

            {/* PROFILE */}
            <div className="px-7 pb-8">

              <div
                className="
                  -mt-16
                  w-32
                  h-32
                  rounded-full
                  border-[5px]
                  border-white
                  overflow-hidden
                  shadow-xl
                "
              >

                <img
                  src="https://i.imgur.com/6VBx3io.png"
                  alt=""
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              </div>

              <h3
                className="
                  mt-5
                  text-3xl
                  font-black
                  text-[#0f172a]
                "
              >
                Jio Tap
              </h3>

              <p
                className="
                  text-[#7c3aed]
                  font-semibold
                  mt-1
                "
              >
                Full Stack Developer
              </p>

              <p
                className="
                  mt-5
                  text-slate-600
                  leading-relaxed
                "
              >
                Building premium digital
                business card experiences,
                AI-powered products,
                and modern web apps.
              </p>

              {/* SOCIALS */}
              <div
                className="
                  mt-7
                  flex
                  gap-3
                  flex-wrap
                "
              >

                <button
                  className="
                    px-5
                    py-3
                    rounded-xl
                    bg-pink-500
                    text-white
                    font-bold
                  "
                >
                  Instagram
                </button>

                <button
                  className="
                    px-5
                    py-3
                    rounded-xl
                    bg-blue-600
                    text-white
                    font-bold
                  "
                >
                  LinkedIn
                </button>

                <button
                  className="
                    px-5
                    py-3
                    rounded-xl
                    bg-black
                    text-white
                    font-bold
                  "
                >
                  GitHub
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CardShowcase;