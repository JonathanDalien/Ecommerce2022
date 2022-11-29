export const category= [
        {
            name: "Kopfhörer",
            picture: "https://png2.cleanpng.com/sh/30fd5b6035e83757618d6a1cea92be1f/L0KzQYi4UsE3N2I9e5GAYUO4RoW7UvMxbmZoUZCANEG8RoaAUcE2OWQ5TKoAMUS6SYG7TwBvbz==/5a356442c0f5c9.5419657115134485147904.png"
        },
        {
            name: "Lautsprecher",
            picture: "https://www.pngmart.com/files/15/JBL-Audio-Speakers-PNG-Background-Image.png"
        },
        {
            name: "In-Ear",
            picture: "https://png2.cleanpng.com/sh/4acb26b10e38bf9b9ad8ef5ac287b382/L0KzQYm3VsA4N6FtgpH0aYP2gLBuTf1ia5xufZ9uYYKwfbF1igRweqQygdC2ZXH1Pb72jvl1d6MygNdqZIDrf7Bsk71ifZVuRadrMUmzQrLpgvE5amQ1RqQ6MES2RoOCUcUzQGQ7Tak8OUe5RIK1kP5o/kisspng-mackie-ear-monitors-in-ear-monitor-headphones-audi-5b1902abba8b30.2104362915283657397641.png"
        },
        {
            name: "Pods",
            picture: "https://png2.cleanpng.com/sh/3ed7275e76bbd7baf0af83953e5b2d09/L0KzQYm3VsExN6t7e5H0aYP2gLBuTfFxeJ1qRdNycoDydMS0iPVibKFth9Ducz3sgLn2jvUuaaF1hNc2ZXH1csbrk702amJpUdZqYUa2RIiBUb41Pmo5S6c9OUG4Qom9Vsc2PmM5SKgCLoDxd1==/kisspng-apple-airpods-headphones-iphone-apple-earbuds-5b1d9daa634781.4694354915286675624067.png"
        },
    ]
    payer: [
        {
          email_address: shippingData.email,
          name: {
            surname: shippingData.lastName,
            given_name: shippingData.firstName,
          },
          address: {
            postal_code: shippingData.postalCode,
            address_line_1: shippingData.street,
            address_line_2: shippingData.houseNumber,
            admin_area_1: shippingData.city,
            country_code: "DE",
          },
          payer_id: user.uid,
        },
      ],