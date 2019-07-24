export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-home"
    },
    {
      name: "My Account",
      url: "/myaccount",
      icon: "icon-user",
      children: [
        {
          name: "My Profile",
          url: "/profile"
        },
        {
          name: "Account Setting",
          url: "/accountsetting"
        }
      ]
    },
    {
      name: "My Bookings",
      url: "/mybookings",
      icon: "icon-user",
      children: [
        {
          name: "Service Booking",
          url: "/servicebooking"
        },
        {
          name: "Service Feedback",
          url: "/servicefeedback"
        }
      ]
    },
    {
      name: "Personal Health Record",
      url: "/personalhealthrecord/pregnancyrecord",
      icon: "icon-plus",
      children: [
        {
          name:'Pregnancy Record',
          url:'/personalhealthrecord/pregnancyrecord'
        },
        {
          name:'Child Record',
          url:'/personalhealthrecord/childrecord'
      
       },
        {
          name: "General Medical Record",
          url: "/personalhealthrecord/generalmedicalrecord"
        },
        {
          name: `Mom's Diary `,
          url: "/personalhealthrecord/momdiary"
        },
        {
          name:'Pregnancy Vitals',
          url:'/personalhealthrecord/pregnancyvitals'
        },
        {
          name: "Share My Record",
          url: "/personalhealthrecord/sharemyrecord"
        }
      ]
    },
    {
      name:'Blog',
      url:'/blog/addblogpost',
      icon:'icon-home',
    },
    {
      name:'Health Tools',
      url:'/healthtools',
      icon:'icon-home',
      children : [
        {
          name: 'Ovulation Calculator',
          url:'/ovulationcalculator',
        },
        {
          name: 'Weight gain calculator',
          url:'/weightgain',
        },
        {
          name:'Kick Counter',
          url:'/kickcounter'
        }, {
          name: 'Baby Growth Calculator',
          url: '/babygrowthcalculator'
        },
        {
          name: 'Child development',
          url:'/childdevelopment',
        },
      ]
    }
  ]
};
