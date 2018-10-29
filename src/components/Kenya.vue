<template>
  <stories-component v-bind:title="'Kenya'">
    <section class="margin-default">
      <div class="container">
        <div class="row center-sm">
          <div class="col-xs-12 col-xl-12 col-sm-6 col-md-7 col-lg-8">
            <h3 class="title-h3 little-xs" ref="text1">“I was sure I was going to die, unless I got help.”</h3>
          </div>
        </div>
      </div>
    </section>
    <section class="margin-default history-texts">
      <div class="container">
        <div class="row center-sm text-left">
          <div class="col-md-7 col-xs-12">
            <p class="title-h4" ref="text2">Lena was alone in the wilderness when her labour started.</p>
            <p class="title-h4" ref="text3">Hours earlier, she had awoken to the sound of gunshots – and then her house was on fire. Cattle rustlers were attacking her community.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="hero-text nested-on-mobile" ref="hero1">
      <figure class="kenya-hero1"></figure>
      <div class="container">
        <div class="row center-sm middle-sm">
          <div class="col-xs-12 col-xl-12 col-sm-6 col-md-7 col-lg-8">
            <p class="title-h2 little-xs" ref="text4">“I remember shouting at my children to run into the nearby bush.”</p>
          </div>
        </div>
      </div>
      <figcaption class="image-credit">
        © UNFPA Kenya/ Douglas Waudo
      </figcaption>
    </section>
    <section class="margin-default reverse-on-mobile" :class="{container: $root.isMobile}">
      <div class="row center-sm start-md middle-md" ref="text5">
        <div class="col-md-5 col-xs-12">
          <img src="../assets/images/img-kit.jpg" alt="" width="100%">
          <figcaption class="image-credit">
            © UNFPA Kenya/ Douglas Waudo
          </figcaption>
        </div>
        <div class="col-md-4 col-md-offset-1 col-xs-12 kit-text">
          <p class="title-h4">When she fled, Lena grabbed just one thing: a plastic bag containing her personal items and a UNFPA clean delivery kit.</p>
        </div>
      </div>
    </section>
    <section class="margin-default">
      <div class="container">
        <div class="row center-md">
          <div class="col-md-9 col-xs-12">
            <p class="title-h4" ref="text6">When Lena cried out in the dark, her neighbour heard and came to help. She delivered Lena’s baby boy – using the kit to keep mother and baby safe from infection.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="hero-text nested-on-mobile" ref="hero2">
      <figure class="kenya-hero2"></figure>
      <div class="container">
        <div class="row center-sm middle-sm">
          <div class="col-xs-12 col-xl-12 col-sm-6 col-md-7 col-lg-8">
            <p class="title-h2 little-xs" ref="text7">“That, I believe, is what saved my life.”</p>
          </div>
        </div>
      </div>
      <figcaption class="image-credit">
        © UNFPA Kenya/ Douglas Waudo
      </figcaption>
    </section>
    <section class="kit" ref="kit">
      <div class="container">
        <div class="row middle-md center-md">
          <div class="col-md-10 col-xs-12">
            <h3 class="title-h4">UNFPA clean delivery kits contain simple items that can make a difference between life and death.</h3>
          </div>
          <!-- <div class="col-md-5 col-xs-12">
            <p>UNFPA distributes clean delivery kits to pregnant women who may lack sterile birthing conditions. The simple items in the kit can make a difference between life and death. </p>
          </div> -->
        </div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none">
          <defs>
            <!-- 0 0 444 241 -->
            <g id="plasticbag" fill="none" stroke="currentColor" stroke-width="4">
                  <path d="M22.5535452,5.27272727 C21.5746766,11 22.5535452,29.1363636 22.5535452,29.1363636 L22.5535452,42.5 L23.5324137,206.681818 C23.5324137,206.681818 18.6380708,214.318182 22.5535452,216.227273 C26.4690195,218.136364 108.693981,216.227273 112.609455,217.181818 C116.524929,218.136364 243.777846,218.136364 243.777846,218.136364 L266.291823,219.090909 L303.488829,219.090909 L418.016454,221 L440.530431,216.227273 L440.530431,202.863636 L440.530431,183.772727 C440.530431,174.227273 441.5093,147.5 441.5093,147.5 L441.5093,58.7272727 L441.5093,38.6741818 C441.5093,35.7580455 439.858928,33.0786364 437.216961,31.7107727 C435.79956,30.9776818 434.7786,29.8541818 435.636088,28.1818182 C437.593826,24.3636364 436.614957,17.6818182 436.614957,17.6818182 L435.993376,7.38513636 C435.793686,4.06045455 432.958883,1.47077273 429.54361,1.49081818 L277.059378,2.40909091 L213.432919,0.5 L69.5392373,3.36363636 C69.5392373,3.36363636 23.5324137,-0.454545455 22.5535452,5.27272727 Z"></path>
                  <path d="M434.5093,31.3752404 C406.975441,32.4735008 371.501996,29.6015498 339.826258,30.0474435 C312.240281,30.4356786 284.719205,31.7755563 257.136178,32.2318835 C238.800594,32.5339051 220.451243,32.4454952 202.107793,32.3570852 L146.158991,32.0869132 C104.451094,31.8859315 62.7431969,31.6838516 21.0353,31.4828699"></path>
                  <path d="M23.5608,49.5 C20.453843,48.250156 12.7701764,48.250156 0.5098,49.5 L3.5098,214.5 C3.5098,214.5 1.9088,224.3 3.5098,225.5 C11.5098,231.5 19.4408,226.5 19.4408,226.5 L19.4408,233.441 C19.4788,235.694 21.3088,237.5 23.5608,237.5 C65.5458,237.504 419.7468,237.56 423.5098,238.5 C426.0528,239.136 432.6388,238.559 437.0988,238.054 C439.5538,237.776 441.3358,235.592 441.1128,233.132 L440.5098,226.5"></path>
              </g>
              <!-- 0 0 151 137 -->
              <g id="gloves" transform="translate(1.000000, 1.000000)" fill="none" stroke-width="2">
                    <g transform="translate(124.500000, 96.000000) rotate(90.000000) translate(-124.500000, -96.000000) translate(86.000000, 72.000000)">
                        <g id="Group">
                            <path d="M59.8165563,47.6571429 L18.2503063,47.6571429 C14.2428688,47.6571429 10.3729313,46.1979429 7.36786875,43.5531429 L5.90968125,42.2694857 C2.37043125,39.1556571 0.34368125,34.6752 0.34368125,29.9684571 L0.34368125,18.5554286 C0.34368125,14.3465143 1.96549375,10.2994286 4.87293125,7.25005714 L6.59580625,5.44251429 C9.70055625,2.18605714 14.0091188,0.342857143 18.5149938,0.342857143 L60.2077438,0.342857143 C64.1649938,0.342857143 67.9902438,1.76571429 70.9801813,4.35085714 C74.5847438,7.46674286 76.6561813,11.9904 76.6561813,16.7485714 L76.6561813,30.9346286 C76.6561813,35.8745143 74.4245563,40.5517714 70.5800563,43.6669714 L70.1888687,43.9844571 C67.2566812,46.3597714 63.5943688,47.6571429 59.8165563,47.6571429 Z" stroke="currentColor"></path>
                            <path d="M56.9355875,43.2 L20.9869,43.2 C17.520525,43.2 14.173775,42.0157714 11.575025,39.8694857 L10.3134625,38.8278857 C7.2527125,36.2996571 5.500275,32.664 5.500275,28.8438857 L5.500275,19.5812571 C5.500275,16.1657143 6.9020875,12.8804571 9.4169625,10.4057143 L10.906775,8.93897143 C13.5928375,6.29622857 17.3184,4.8 21.21515,4.8 L57.274525,4.8 C60.6969,4.8 64.0044625,5.95474286 66.591525,8.05302857 C69.70865,10.5819429 71.500275,14.2532571 71.500275,18.1145143 L71.500275,29.6283429 C71.500275,33.6370286 69.569775,37.4331429 66.245025,39.9613714 L65.906775,40.2192 C63.3705875,42.1474286 60.203275,43.2 56.9355875,43.2 Z" stroke="currentColor"></path>
                            <path d="M53.8633563,39.0857143 L23.9055437,39.0857143 C21.0173562,39.0857143 18.2281688,38.1552 16.0625437,36.4690286 L15.0113563,35.6502857 C12.4607313,33.6644571 10.9997938,30.8070857 10.9997938,27.8057143 L10.9997938,20.5282286 C10.9997938,17.8443429 12.1685438,15.2633143 14.2640437,13.3186286 L15.5063562,12.1666286 C17.7434812,10.0896 20.8489188,8.91428571 24.0959813,8.91428571 L54.1452313,8.91428571 C56.9976688,8.91428571 59.7538562,9.82148571 61.9091688,11.4699429 L61.9091688,11.4706286 C64.5072313,13.4571429 65.9997938,16.3419429 65.9997938,19.3755429 L65.9997938,28.4221714 C65.9997938,31.5716571 64.3910438,34.5545143 61.6204188,36.5410286 L61.3385438,36.7433143 C59.2258563,38.2587429 56.5858562,39.0857143 53.8633563,39.0857143 Z" stroke="currentColor"></path>
                            <path d="M20.6679688,25.7912914 C20.9017188,26.4118629 21.1760313,26.9062629 21.4915937,27.2751771 C22.0409062,27.9183771 22.7229062,28.2399771 23.5382812,28.2399771 C23.9789687,28.2399771 24.3605313,28.1007771 24.6829688,27.8216914 C25.0047188,27.5432914 25.1655937,27.1538057 25.1655937,26.6546057 C25.1655937,26.2054629 25.0040313,25.81392 24.6795313,25.4806629 C24.4677813,25.2694629 24.0229688,24.9526629 23.3430312,24.5295771 L22.1619063,23.7944914 C21.8057812,23.5695771 21.5218438,23.3426057 21.3107812,23.1128914 C20.9175312,22.6767771 20.7215938,22.1954057 20.7215938,21.6694629 C20.7215938,20.9720914 20.9539688,20.3919771 21.4187188,19.9284343 C21.8834687,19.4655771 22.4980937,19.2338057 23.2646563,19.2338057 C23.5802187,19.2338057 23.9604063,19.3112914 24.4052187,19.4662629 C24.8486563,19.6212343 25.1023438,19.6994057 25.1655937,19.6994057 C25.3367812,19.6994057 25.4557187,19.6589486 25.5210313,19.5773486 C25.5856562,19.49712 25.6372188,19.38192 25.6729688,19.2338057 L25.9569062,19.2338057 L26.2614688,22.17552 L25.9300937,22.17552 C25.7045938,21.2895771 25.3429687,20.6710629 24.8445313,20.3199771 C24.3460938,19.9688914 23.8538437,19.7933486 23.3664062,19.7933486 C22.9875938,19.7933486 22.6575938,19.90512 22.3750312,20.1279771 C22.0938437,20.3501486 21.9529062,20.6594057 21.9529062,21.0550629 C21.9529062,21.4102629 22.0608438,21.7140343 22.2767188,21.9656914 C22.4925937,22.2221486 22.8287812,22.4902629 23.2839063,22.7686629 L24.5000937,23.5174629 C25.2618438,23.9858057 25.7980938,24.4150629 26.1109062,24.80592 C26.4182188,25.2022629 26.5729062,25.66992 26.5729062,26.2095771 C26.5729062,26.9336914 26.2985937,27.5384914 25.7513438,28.0239771 C25.2034063,28.5101486 24.5028438,28.7528914 23.6503438,28.7528914 C23.2220313,28.7528914 22.7744688,28.6719771 22.3083438,28.5101486 C21.8415312,28.34832 21.5740937,28.26672 21.5067187,28.26672 C21.3437812,28.26672 21.2344688,28.3167771 21.1780937,28.41552 C21.1217187,28.5142629 21.0845937,28.6198629 21.0667187,28.7330057 L20.7628438,28.7330057 L20.3496562,25.7912914 L20.6679688,25.7912914 Z" fill="currentColor"></path>
                            <path d="M30.8743875,27.22464 C31.4477625,27.9199543 32.1517625,28.2669257 32.987075,28.2669257 C33.8045125,28.2669257 34.5030125,27.9288686 35.0832625,27.2520686 C35.6635125,26.5745829 35.9536375,25.49184 35.9536375,24.0031543 C35.9536375,22.49664 35.660075,21.4084114 35.07295,20.7384686 C34.4865125,20.06784 33.7907625,19.7332114 32.987075,19.7332114 C32.156575,19.7332114 31.45395,20.0801829 30.877825,20.7754971 C30.3023875,21.4701257 30.0150125,22.5460114 30.0150125,24.0031543 C30.0150125,25.4561829 30.3010125,26.5300114 30.8743875,27.22464 M29.8390125,20.4545829 C30.690825,19.64064 31.73995,19.2340114 32.9836375,19.2340114 C34.2335125,19.2340114 35.2840125,19.6426971 36.135825,20.46144 C37.0605125,21.3473829 37.5225125,22.5281829 37.5225125,24.0031543 C37.5225125,25.5007543 37.0447,26.6932114 36.0883875,27.5791543 C35.2317625,28.3704686 34.197075,28.7661257 32.9836375,28.7661257 C31.6856375,28.7661257 30.6076375,28.3279543 29.7510125,27.4509257 C28.8806375,26.5553829 28.44545,25.4068114 28.44545,24.0031543 C28.44545,22.5281829 28.9102,21.3453257 29.8390125,20.4545829" fill="currentColor"></path>
                            <path d="M44.76065,25.0221943 L43.1732125,21.2171657 L41.5782125,25.0221943 L44.76065,25.0221943 Z M38.794525,28.5707657 L38.794525,28.3143086 C39.1513375,28.2745371 39.4180875,28.1408229 39.59615,27.9131657 C39.7742125,27.6861943 40.0794625,27.0642514 40.5119,26.0480229 L43.3987125,19.26768 L43.6744,19.26768 L47.1249625,27.0999086 C47.355275,27.6189943 47.5388375,27.9399086 47.6763375,28.0626514 C47.8138375,28.18608 48.0448375,28.2697371 48.370025,28.3143086 L48.370025,28.5707657 L44.847275,28.5707657 L44.847275,28.3143086 C45.2522125,28.2786514 45.5134625,28.2347657 45.6303375,28.1833371 C45.7479,28.1319086 45.8063375,28.0057371 45.8063375,27.8041371 C45.8063375,27.7369371 45.7829625,27.6183086 45.738275,27.4482514 C45.6929,27.2781943 45.6303375,27.0992229 45.548525,26.9106514 L44.9944,25.5817371 L41.343775,25.5817371 C40.9842125,26.4861943 40.769025,27.0375086 40.6995875,27.2363657 C40.6294625,27.4359086 40.5944,27.5936229 40.5944,27.7101943 C40.5944,27.9426514 40.689275,28.1037943 40.8783375,28.1936229 C40.9952125,28.2471086 41.2159,28.2875657 41.5397125,28.3143086 L41.5397125,28.5707657 L38.794525,28.5707657 Z" fill="currentColor"></path>
                            <path d="M54.0459563,20.1984686 C53.6540813,20.0277257 53.1577063,19.9420114 52.5582063,19.9420114 C52.2735812,19.9420114 52.0989563,19.9701257 52.0336437,20.0263543 C51.9683312,20.0825829 51.9360188,20.2073829 51.9360188,20.4007543 L51.9360188,24.0034971 C52.1835188,24.0261257 52.3457688,24.03984 52.4227688,24.0439543 C52.4990813,24.0487543 52.5733313,24.0508114 52.6462063,24.0508114 C53.2821438,24.0508114 53.7819563,23.9609829 54.1470188,23.78064 C54.8097688,23.4528686 55.1418313,22.8384686 55.1418313,21.9394971 C55.1418313,21.0933257 54.7760813,20.5132114 54.0459563,20.1984686 Z M49.3716437,28.3138971 C49.8996437,28.2652114 50.2289562,28.1609829 50.3595813,28.0018971 C50.4902063,27.8428114 50.5555188,27.4793829 50.5555188,26.9109257 L50.5555188,20.9266971 C50.5555188,20.4460114 50.4826438,20.1285257 50.3362063,19.9756114 C50.1890813,19.8233829 49.8680188,19.7266971 49.3716437,19.6855543 L49.3716437,19.4290971 L53.0250188,19.4290971 C54.1972063,19.4290971 55.0937063,19.6567543 55.7165813,20.1106971 C56.3387687,20.5653257 56.6502063,21.1632686 56.6502063,21.9052114 C56.6502063,22.8453257 56.3050813,23.5269257 55.6148313,23.9493257 C54.9252688,24.3724114 54.0610813,24.5836114 53.0250188,24.5836114 C52.8758313,24.5836114 52.6853938,24.5801829 52.4530187,24.5733257 C52.2206438,24.5671543 52.0480812,24.56304 51.9360188,24.56304 L51.9360188,27.0727543 C51.9360188,27.59184 52.0157687,27.91824 52.1752688,28.05264 C52.3361438,28.18704 52.6929563,28.2741257 53.2477688,28.3138971 L53.2477688,28.5703543 L49.3716437,28.5703543 L49.3716437,28.3138971 Z" fill="currentColor"></path>
                        </g>
                    </g>
                    <g stroke="currentColor" fill="none">
                        <g id="a_icon_glove">
                            <path d="M48.8205,37.1528559 C49.876791,27.5865303 50.1847623,21.4368329 50.9334713,14.7086196 C51.2274262,12.0685331 51.6880205,9.87157349 52.2595779,8.05121326 C52.226873,8.01970029 52.1968934,7.98663112 52.1630205,7.9555072 C51.3056844,7.16651585 50.1536148,6.76307205 49.0358074,7.0105072 C47.4850492,7.35442651 46.6565246,8.68419597 46.2142295,10.2575101 C47.4149672,18.5205216 48.8205,24.6285908 48.8205,37.1528559 Z"></path>
                            <path d="M30.5581906,30.0602983 C32.2339283,33.6259323 33.9225143,37.1697795 34.7226168,41.0524885 C34.4014078,32.6953271 34.0805881,24.3381657 33.7597684,15.9810043 C33.6441332,12.9756009 33.6690512,9.65973631 34.5143176,6.83368444 C32.0166742,8.04557205 29.4543996,12.0426614 29.9395225,21.2697363 C30.0937029,24.2004424 30.3160184,27.0047075 30.5581906,30.0602983 Z"></path>
                            <path d="M29.2749508,133.001961 C28.2182705,132.63431 27.1619795,131.530189 27.0428402,130.229987 C26.7629016,128.843805 27.463332,127.472019 28.0936803,126.217725 C30.6890492,121.051154 32.4749713,115.442235 33.3591721,109.681586 C33.6138033,108.025016 33.7901762,106.300362 33.3350328,104.691255 C32.8109754,102.837048 31.5129016,101.347379 30.6236393,99.6522925 C29.4326352,97.3833588 28.9852787,94.6977536 29.3722869,92.1420908 C29.6705246,90.1735029 30.4480451,88.236817 30.2171639,86.2585029 C30.0022459,84.4198573 28.949459,82.8294251 28.071877,81.2203184 C20.5143156,67.3620043 25.0879426,49.3393098 18.7490287,34.7281859 C17.5697049,32.0095115 16.9159959,29.0636326 17.0028197,26.0800159 C17.2738033,16.8225951 22.1865492,16.4440504 25.8202992,20.744987 C25.3176557,19.2230274 24.8068361,17.6571052 24.2905656,15.9624078 C23.4511393,13.2063847 22.0802582,9.95004467 19.1134549,9.97922334 C18.1229631,9.98933862 17.1838648,10.4200159 16.4168566,11.0740072 C12.5308115,14.3871484 13.2830246,20.3423213 14.2964877,25.2937478 C15.863209,32.9471196 17.4299303,40.6001023 18.997041,48.2534741 C17.0401967,43.1759957 13.4196844,39.0952608 10.612123,34.474915 C6.39163115,27.5280562 -1.07754918,26.5830562 0.380545082,37.3873357 C0.753536885,40.153085 1.8039877,42.7612695 3.30529918,45.0726095 C11.3725123,57.4933876 9.89534016,74.871817 18.9713443,86.3966153 C20.0252992,87.7345548 21.2381066,89.0265865 21.715832,90.6858804 C22.229377,92.4720043 21.8069385,94.3872925 21.8314672,96.2516153 C21.8630041,98.6730562 22.6837418,101.075434 24.1266516,102.969713 C25.2051352,104.385073 26.6285779,105.543272 27.3936393,107.166385 C28.0578607,108.574742 28.1571434,110.193964 28.1746639,111.763777 C28.2350123,117.222912 27.4411393,122.691385 25.8335369,127.885967 C25.4430246,129.147653 25.0054016,130.528777 25.4741721,131.760506 C25.7821434,132.939713 26.9244795,133.782004 27.9542951,133.946183 C29.8535164,133.999094 31.6986189,133.827912 33.5110164,133.565304 C32.1078197,133.466486 30.6960574,133.299195 29.2749508,133.001961 Z"></path>
                            <path d="M76.5540369,111.727712 C76.5096516,108.535176 76.4773361,105.263663 77.4966393,102.253202 C79.2346721,97.1232017 81.1771107,93.5805216 84.037623,89.032928 C86.796127,84.6467896 90.5167008,79.432755 91.4970697,74.2856369 C92.9275205,66.7711556 93.9947131,59.1819769 94.6935861,51.5554496 C94.9707992,48.5263141 94.9338115,44.8680865 92.1464959,43.4223804 C90.6556967,42.648951 88.882623,42.8458098 87.4673566,43.760853 C84.4121721,45.7360548 83.4567213,49.2468329 82.271168,52.4946138 C81.4772951,54.6670634 78.8780328,61.4326254 77.5484221,64.097611 C76.5999795,65.9988934 73.8383607,65.1278127 74.0591189,62.9962133 C75.6624385,47.4996138 78.4365164,26.6489222 78.2511885,11.670536 C78.222377,9.30939769 78.1519057,6.84399424 76.651373,4.89874928 C75.8851434,3.90511816 74.742418,3.26202017 73.5218238,3.31104035 C70.7578689,3.42191931 69.5594672,6.66153026 68.9649385,9.36386455 C66.9457992,18.531804 65.5278074,27.8440807 64.7222541,37.2139366 C64.7752049,28.8528847 63.9104713,18.6539654 63.9638115,10.2929135 C63.9852254,6.88251009 64.1004713,4.23775504 62.2028074,1.46266859 C60.4418033,-1.11322478 52.6942418,-1.11322478 50.9332377,14.7082305 C50.1845287,21.4368329 49.8765574,27.5865303 48.8206557,37.1528559 C48.8206557,23.5388646 47.1597131,17.5086052 45.9060246,8.04771182 C45.5003279,4.9862853 44.6215779,1.29654467 41.492418,0.765103746 C40.4478074,0.587697406 39.3837295,0.863533141 38.4621516,1.40703458 C33.7943033,4.1595562 33.5521311,10.574196 33.7596516,15.9808098 C34.0804713,24.3383602 34.401291,32.6955216 34.7228893,41.052683 C33.5439549,35.33483 30.4397131,30.3507233 28.285082,24.9522795 C25.046127,16.8351614 17.3441189,14.4246138 17.0030533,26.0801326 C16.9158402,29.0633602 17.5695492,32.0092392 18.748873,34.7283026 C25.0877869,49.3390375 20.5141598,67.362121 28.0721107,81.2204352 C28.9493033,82.8295418 30.0024795,84.4199741 30.2170082,86.2582305 C30.4478893,88.2365447 29.6703689,90.1736196 29.3721311,92.1418184 C28.985123,94.6978703 29.4328689,97.3834755 30.6234836,99.6524092 C31.5127459,101.347107 32.8108197,102.836775 33.334877,104.691372 C33.7900205,106.300478 33.6136475,108.024744 33.3594057,109.681314 C32.4748156,115.442352 30.6888934,121.051271 28.0935246,126.217452 C27.4631762,127.472135 26.7627459,128.843533 27.0426844,130.230104 C27.1622131,131.529916 28.2185041,132.634037 29.2747951,133.002078 C32.5764344,133.691862 35.828627,133.70898 39.0309836,133.693807 C40.0985656,133.688749 41.1606967,133.680579 42.217377,133.691862 C53.5745492,132.634037 66.9574795,138.521127 76.6416393,130.594254 C76.9901025,130.037524 77.2217623,129.255536 77.3654303,128.319484 C78.0833811,123.639614 76.6011475,115.115161 76.5540369,111.727712 Z"></path>
                        </g>
                    </g>
                </g>
                <!-- 0 0 119 131 -->
                <g id="razor" stroke="none" stroke-width="2" fill="none" fill-rule="evenodd">
                  <g transform="translate(0.000000, -4.000000)" stroke="currentColor">
                      <g id="a_icon_razor" transform="translate(53.500000, 81.000000) rotate(45.000000) translate(-53.500000, -81.000000) translate(2.000000, 58.000000)" stroke-width="2">
                          <polygon points="0.495192308 45.5 102.504808 45.5 102.504808 32.5 0.495192308 32.5"></polygon>
                          <path d="M53.9759615,22 C53.9759615,23.925 52.4161058,25.5 50.5096154,25.5 C48.603125,25.5 47.0432692,23.925 47.0432692,22 L47.0432692,14 C47.0432692,12.075 48.603125,10.5 50.5096154,10.5 C52.4161058,10.5 53.9759615,12.075 53.9759615,14 L53.9759615,22 Z M92.6009615,18 C92.6009615,15.8 94.3836538,14 96.5625,14 L102.504808,14 L102.504808,0.5 L0.495192308,0.5 L0.495192308,14.5 L5.44711538,14.5 C7.62596154,14.5 9.40865385,16.3 9.40865385,18.5 C9.40865385,20.7 7.62596154,22.5 5.44711538,22.5 L0.495192308,22.5 L0.495192308,45.5 L102.504808,45.5 L102.504808,22 L96.5625,22 C94.3836538,22 92.6009615,20.2 92.6009615,18 Z"></path>
                      </g>
                      <g id="a_cord" transform="translate(58.000000, 0.000000)">
                          <path d="M-12.0404716,51.0304117 C6.85525341,54.0103406 27.0781964,46.2309679 39.1061094,31.3565691 C41.3385766,28.5957393 43.4276826,25.2389237 43.0760419,21.5403855 C43.0507959,21.2707944 43.0021072,20.9795638 42.8055491,20.7938254 C42.5702204,20.5711197 42.2032519,20.5711197 41.8840704,20.6315297 C35.027078,21.9344034 36.1342952,37.3092138 35.3615874,42.1645595 C33.4960888,53.8777992 26.2820459,64.6542321 16.0628281,70.7213855 C14.2721658,71.7844222 12.1136333,72.1703253 10.1065768,71.6122085 C4.88516422,70.1614654 5.39910053,64.207919 8.3285375,61.1666784 C10.6412509,58.765604 13.9737221,57.7052722 17.1438977,56.6746947 C25.9195856,53.820094 34.552814,50.5245902 42.9994023,46.8089208 C47.7772067,44.7071918 63.3602966,40.1998802 63.8670198,33.8297748 C63.9021839,33.3843634 63.8264459,32.8794435 63.470297,32.6089507 C63.2313617,32.4277205 62.9157868,32.3907532 62.6164414,32.3700154 C54.1824761,31.808292 47.7366328,39.3703689 43.0670255,45.3888336 C39.207995,50.3631961 35.3489644,55.336657 31.4890322,60.3110195 C26.8176217,66.3330907 20.9416165,72.968279 13.0928173,72.0125378 C11.7096974,71.8448323 10.423955,71.0378621 9.9163302,69.7413 C8.79829332,66.884896 12.3273227,64.6380026 15.1837266,63.6606219 C24.3020387,60.5391351 33.4203508,57.4176482 42.5395646,54.2961614 C55.5610877,49.8393417 68.602447,44.8298152 77.9416616,34.2120713 C78.4087125,33.6810038 78.7053529,32.9903455 78.6683855,32.2834577 C78.4619094,28.3910664 70.6933563,31.8380462 69.3814662,33.2752646 C67.600722,35.2255177 66.6062102,37.7447072 65.5044029,40.1457816 C60.1351209,51.8500049 51.3486133,61.9628288 40.507262,68.9144936 C36.0711802,71.7582746 31.0814898,74.1368079 25.8113885,74.1043487 C23.1812969,74.0872175 20.1184168,73.1468042 19.7803008,70.1190882 C19.7000546,69.3950692 19.8307928,68.6539189 20.1130069,67.9830968 C21.0525186,65.7506296 23.0703948,64.5000512 25.06573,63.3838176 C33.9162543,58.4337995 43.5494043,55.0192788 52.4882896,50.2288514 C60.1197929,46.1390003 67.4303116,40.7967676 72.1657388,33.6467414 C73.4911534,31.6450947 71.2478665,29.2115612 69.1344162,30.3503359 C66.9172769,31.5468157 65.0887456,33.7774796 64.2114473,35.9215858 C62.5515232,39.9780761 62.7904585,44.5169452 62.4406211,48.8863055 C61.6390608,58.9297029 57.4887997,68.6755583 50.8076277,76.2168975" transform="translate(33.315507, 48.407068) rotate(263.000000) translate(-33.315507, -48.407068) "></path>
                      </g>
                  </g>
              </g>
              <!-- 0 0 325 294 -->
              <g id="plastic" stroke="none" stroke-width="4" fill="none" fill-rule="evenodd">
                  <g transform="translate(1.000000, 1.000000)" stroke="currentColor" stroke-width="4">
                      <g>
                          <path d="M322.5,0.5 C320.5,0.5 221.5,1.5 221.5,1.5 L131.5,1.5 L46.5,0.5 L12.5,4.5 L15.5,288.5 C15.5,288.5 16.5,291.5 34.5,291.5 C52.5,291.5 185.5,287.5 185.5,287.5 C185.5,287.5 284.5,283.5 295.5,284.5 C306.5,285.5 322.5,290.5 322.5,285.5 C322.5,280.5 321.5,253.5 321.5,253.5 L320.5,174.5 L320.5,115.5 L322.5,48.5 L322.5,25.5 L322.5,0.5 Z"></path>
                          <polyline points="11.6665 14 0.4995 17.5 0.4995 254.5 1.4995 275.5 14.3335 278"></polyline>
                          <path d="M320.3335,128.6665 C318.5005,129.4995 190.5005,128.4995 190.5005,128.4995 L169.5005,130.4995 L153.5005,131.4995 L155.5005,171.4995 L189.5005,169.4995 L195.5005,167.4995 L202.5005,168.4995 L320.3335,168.6665 L320.3335,128.6665 Z"></path>
                          <polygon points="313.5 168.5 320.5 167.5 320.5 128.5 313.5 128.5"></polygon>
                      </g>
                  </g>
              </g>
              <!-- 0 0 197 249 -->
              <g id="bag" stroke="currentColor" fill="none" stroke-width="3">
                    <g>
                        <path d="M190.6561,1.3895 C185.6061,0.8155 169.6151,1.3895 169.6151,1.3895 L157.8321,1.3895 L15.7421,1.9525 C14.1711,1.9585 12.6091,1.7285 11.1091,1.2575 C8.9841,0.5905 5.7451,-0.1055 4.6481,1.3895 C2.9651,3.6835 4.6481,51.8715 3.8061,54.1665 C3.0051,56.3525 2.9671,124.1485 2.9651,130.5525 C2.9651,130.8775 2.9541,131.2005 2.9331,131.5245 L2.1541,143.7415 C2.1341,144.0675 2.1231,144.3945 2.1231,144.7215 L2.1231,166.0305 L0.5051,230.5535 C0.4621,232.2715 0.7061,233.9835 1.2281,235.6195 C3.2651,242.0065 9.1991,246.3425 15.9021,246.3425 L16.4311,246.3425 L33.2641,246.3425 C41.6811,246.3425 65.2481,246.9155 65.2481,246.9155 L143.5231,246.9155 L161.2041,246.9155 C163.7761,246.9155 166.1381,245.9495 167.3441,244.4005 C167.9911,243.5695 168.9811,242.9715 170.4561,243.4745 C173.3991,244.4775 178.2721,244.1645 179.4521,244.0705 C179.6551,244.0535 179.8551,244.0415 180.0591,244.0345 L188.7941,243.6835 C191.7251,243.5665 194.0091,241.9055 193.9911,239.9045 L193.1851,150.9585 C193.1821,150.6805 193.1871,150.4025 193.2001,150.1235 L194.8391,113.8305 C194.8561,113.4465 194.8591,113.0605 194.8471,112.6755 L192.3741,30.0505 C192.3511,29.3235 192.3821,28.5985 192.4631,27.8745 C193.0201,22.8965 195.1071,1.8955 190.6561,1.3895 Z"></path>
                        <path d="M140.4745,210.5175 C140.4745,201.0695 148.1335,193.4105 157.5815,193.4105 C167.0305,193.4105 174.6895,201.0695 174.6895,210.5175 C174.6895,219.9655 167.0305,227.6255 157.5815,227.6255 C148.1335,227.6255 140.4745,219.9655 140.4745,210.5175 Z"></path>
                        <polygon points="25.464 209.571 112.086 209.571 112.086 199.245 25.464 199.245"></polygon>
                        <polygon points="26.61 226.78 78.24 226.78 78.24 216.455 26.61 216.455"></polygon>
                        <path d="M3.5214,62.5765 C3.5214,62.5765 11.3544,121.4095 27.3544,130.4095 C31.6554,132.8285 118.4174,132.6295 157.3544,132.4095 C165.7944,132.3625 173.0164,125.7435 174.3544,117.4095 C174.3544,117.4095 184.3214,92.1915 186.3544,83.4095 C188.7954,72.8665 192.3544,43.4095 192.3544,43.4095"></path>
                    </g>
                </g>
          </defs>
        </svg>
        <flickity ref="flickity" :options="{freeScroll: false, wrapAround: true, cellAlign: 'center', pageDots: true, prevNextButtons: true}" class="carousel-kit carousel-default carousel-default-dots-in">
          <li>
            <figure>
              <svg viewBox="0 0 444 241">
                <use :xlink:href="kit_icon('plasticbag')"></use>
              </svg>
            </figure>
            <p>A plastic sheet provides a clean surface for the mother to lie on during delivery.</p>
          </li>
          <li>
            <figure>
              <svg viewBox="0 0 151 137">
                <use :xlink:href="kit_icon('gloves')"></use>
              </svg>
            </figure>
            <p>Soap and sterile gloves ensure the birth attendant has clean hands – and during childbirth, clean hands save lives.</p>
          </li>
          <li>
            <figure>
              <svg viewBox="0 0 119 131">
                <use :xlink:href="kit_icon('razor')"></use>
              </svg>
            </figure>
            <p>A fresh razor blade, antiseptic and cord ties reduce the risk of infection when cutting the baby’s umbilical cord.</p>
          </li>
          <li>
            <figure>
              <svg viewBox="0 0 325 294">
                <use :xlink:href="kit_icon('plastic')"></use>
              </svg>
            </figure>
            <p>A clean cloth to wrap the baby keeps her warm during the vulnerable time right after birth.  </p>
          </li>
          <li>
            <figure>
              <svg viewBox="0 0 197 249">
                <use :xlink:href="kit_icon('bag')"></use>
              </svg>
            </figure>
            <p>Even the plastic bag the kit comes in has an important use – it provides a hygienic container to dispose of the placenta.</p>
          </li>
        </flickity>
        <div class="kit__icons">
          <ul>
            <li>
              <figure>
                <svg viewBox="0 0 444 241">
                  <use :xlink:href="kit_icon('plasticbag')"></use>
                </svg>
              </figure>
              <p>A plastic sheet provides a clean surface for the mother to lie on during delivery.</p>
            </li>
            <li>
              <figure>
                <svg viewBox="0 0 151 137">
                  <use :xlink:href="kit_icon('gloves')"></use>
                </svg>
              </figure>
              <p>Soap and sterile gloves ensure the birth attendant has clean hands – and during childbirth, clean hands save lives.</p>
            </li>
            <li>
              <figure>
                <svg viewBox="0 0 119 131">
                  <use :xlink:href="kit_icon('razor')"></use>
                </svg>
              </figure>
              <p>A fresh razor blade, antiseptic and cord ties reduce the risk of infection when cutting the baby’s umbilical cord.</p>
            </li>
            <li>
              <figure>
                <svg viewBox="0 0 325 294">
                  <use :xlink:href="kit_icon('plastic')"></use>
                </svg>
              </figure>
              <p>A clean cloth to wrap the baby keeps her warm during the vulnerable time right after birth.  </p>
            </li>
            <li>
              <figure>
                <svg viewBox="0 0 197 249">
                  <use :xlink:href="kit_icon('bag')"></use>
                </svg>
              </figure>
              <p>Even the plastic bag the kit comes in has an important use – it provides a hygienic container to dispose of the placenta.</p>
            </li>
          </ul>
        </div>
        <div class="kit__share">
          <share-button-component v-on:click="sharing_kit = true" class="light"></share-button-component>
        </div>
      </div>
    </section>
    <section class="share margin-small row center-xs">
      <share-button-component v-on:click="sharing_kit = true" class="vertical"></share-button-component>
    </section>
    <section class="margin-small">
      <div class="container">
        <div class="row center-md middle-xs">
          <div class="col-md-7 col-xs-12">
            <p class="lead" ref="text8">UNFPA distributes clean delivery kits to pregnant women who may lack sterile birthing conditions. These low-cost interventions can prevent maternal deaths.</p>
            <p class="final-credits">All Kenya photos © UNFPA Kenya/ Douglas Waudo</p>

          </div>
        </div>
      </div>
    </section>
    <popup-component v-bind:openedClass="sharing_kit" v-on:close="sharing_kit = false" class="popup-sharing">
      <div class="popup__content">
        <p class="title-h5">How can a razor blade, a plastic sheet and some disposable gloves save two lives? Find out at safebirthevenhere.org and join <span>@UNFPA</span> to support <span>#SafeBirth</span>.</p>
        <div class="buttons">
          <a class="btn btn--primary" v-on:click="shareFacebook('How can a razor blade, a plastic sheet and some disposable gloves save two lives? Find out at safebirthevenhere.org and join @UNFPA to support #SafeBirth.', 'https://www.safebirthevenhere.org/#/kenya')">Share on Facebook</a>
          <br><br>
          <a class="btn btn--primary" v-on:click="shareTwitter('How%20can%20a%20razor%20blade%2C%20a%20plastic%20sheet%20and%20some%20disposable%20gloves%20save%20two%20lives%3F%20Find%20out%20at%20safebirthevenhere.org%20and%20join%20%40UNFPA%20to%20support%20%23safebirth.', 'safebirth%2F%23%2FKenya', '')">Share on Twitter</a>
        </div>
      </div>
    </popup-component>
  </stories-component>
</template>

<script>
import Flickity from 'vue-flickity'
import { TimelineMax, TweenMax, Linear, Power1 } from 'gsap'
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'

import StoriesComponent from './Stories.vue'
import ShareButtonComponent from './ShareButton'
import PopupComponent from './Popup.vue'

import sharing from './mixins/sharing.js'

export default {
  name: 'Kenya',
  mixins: [sharing],
  data () {
    return {
      controller: null,
      wh: 0,
      sharing_kit: false
    }
  },
  methods: {
    kit_icon: function (item) {
      // var src = require('../assets/images/kit-icons.svg')
      return '#' + item
    },
    initParallax: function () {
      this.controller = new ScrollMagic.Controller()

      if (this.$root.isMobile) return

      this.buildTween(this.$refs.text1, this.$refs.text1, 0.7, {y: 50, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
      this.buildTween(this.$refs.text2, this.$refs.text2, 0.7, {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
      this.buildTween(this.$refs.text3, this.$refs.text3, 0.7, {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)

      new ScrollMagic.Scene({triggerElement: this.$refs.hero1, triggerHook: 'onLeave', duration: this.wh * 0.5})
        .setPin(this.$refs.hero1)
        .addTo(this.controller)
      this.buildTween(this.$refs.hero1, this.$refs.text4, 0.5, {y: 10, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onLeave', 0, 0)

      this.buildTween(this.$refs.text5, this.$refs.text5, 0.7, {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
      this.buildTween(this.$refs.text6, this.$refs.text6, 0.7, {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)

      new ScrollMagic.Scene({triggerElement: this.$refs.hero2, triggerHook: 'onLeave', duration: this.wh * 0.5})
        .setPin(this.$refs.hero2)
        .addTo(this.controller)
      this.buildTween(this.$refs.hero2, this.$refs.text7, 0.5, {y: 10, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onLeave', 0, 0)

      this.buildTween(this.$refs.kit, this.$refs.kit, 0.7, {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
      // this.buildTween(this.$refs.video1, this.$refs.video1, 0.7, {opacity: 0}, {opacity: 1, ease: Ease.easeInOut}, 'onEnter', this.wh * 0.3, 0)

      var imagesAnimations = this.$el.querySelectorAll('.image-animation')
      for (var i = 0; i < imagesAnimations.length; i++) {
        var overlay = imagesAnimations[i].querySelector('.image-animation__overlay')
        var image = imagesAnimations[i].querySelector('.image-animation__image')
        var text = imagesAnimations[i].querySelector('.image-animation__text')

        this.buildTween(imagesAnimations[i], overlay, 0.5, {scaleX: 0}, {scaleX: 1, ease: Power1.easeOut}, 'onEnter', this.wh * 0.3, 0)
        this.buildTween(imagesAnimations[i], overlay, 0.5, {opacity: 1, display: 'block'}, {opacity: 0, display: 'none', delay: 0.6, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
        this.buildTween(imagesAnimations[i], image, 0.01, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
        this.buildTween(imagesAnimations[i], text, 0.5, {opacity: 0}, {opacity: 1, delay: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
      }

      this.buildTween(this.$refs.text8, this.$refs.text8, 0.7, {y: 50, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
    },
    buildTween: function (ref, el, speed, from, to, trigger, offset, duration) {
      var tween = new TimelineMax()
        .add([
          TweenMax.fromTo(el, speed, from, to)
        ])

      var scene = new ScrollMagic.Scene({triggerElement: ref, triggerHook: trigger, offset: offset, duration: duration})
        .setTween(tween)
        .addTo(this.controller)

      return scene
    },
    resizeScene: function () {
      this.wh = window.innerHeight
      if (this.controller) {
        this.controller.destroy(true)
        this.$nextTick(this.initParallax())
      }
    }
  },
  created () {
    window.addEventListener('resize', this.resizeScene)
  },
  destroyed () {
    this.controller = this.controller.destroy(true)
    window.removeEventListener('resize', this.resizeScene)
  },
  mounted () {
    this.wh = window.innerHeight
    this.$nextTick(this.initParallax())
  },
  components: {
    Flickity,
    StoriesComponent,
    ShareButtonComponent,
    PopupComponent
  }
}
</script>

<style lang="scss" scoped>
.text-left{
  text-align: left;
}
.history-texts p{
  @media screen and (max-width: 1250px) {
    font-size: 2.125em;
  }
}
.kenya-hero1{
  background-image: url(../assets/images/kenya-img1.jpg);

  @media screen and (min-width: $mobile-breakpoint) {
    /*opacity: 0.4;*/
  }
}

.kenya-hero2{
  background-image: url(../assets/images/kenya-img2.jpg);

  @media screen and (min-width: $mobile-breakpoint) {
    /*opacity: 0.25;*/
  }
}

p.title-h4{
  &:first-child{
    margin-top: 0;
  }
  &:last-child{
    margin-bottom: 0;
  }
}

.kit{
  padding: em(200) 0 em(50);
  background-color: #F6F6F6;

  .container{
    max-width: em(1370);
    @media screen and (max-width: 1650px) {
      max-width: em(950);
    }
    @media screen and (max-width: 1250px) {
      max-width: em(850);
    }
    @media screen and (max-width: 1150px) {
      max-width: em(700);
    }
    @media screen and (max-width: 900px) {
      max-width: em(600);
    }
    @media screen and (max-width: $mobile-breakpoint) {
      max-width: none;
    }
  }

  .title-h2{
    font-size: em(100);
    margin-bottom: 0;
  }

  p{
    font-size: em(24);
    line-height: em(45, 24);
    max-width: em(680, 24);
    margin: 0 auto;
  }

  &__icons{
    margin: em(100) 0 0;

    ul{
      padding: 0;
      margin: 0;
      text-align: center;
      li{
        display: inline-block;
        padding: 0 em(17);
        vertical-align: top;
        box-sizing: border-box;
        width: 19%;
        figure{
          margin: 0;
          padding-top: 100%;
          svg{
            max-width: 60%;
            max-height: 60%;
          }
        }
        p{
          font-size: em(18);
          line-height: em(30, 18);
          opacity: 0;
        }
        &:hover{
          figure{
            color: #FFF;
            background-color: $color_body;
          }

          p{
            opacity: 1;
            transform: none;
          }
        }
      }
    }
  }
  li{
    display: inline-block;
    cursor: pointer;
    figure{
      border-radius: 50%;
      margin: 0;
      border: 1px solid #AFAFAF;
      position: relative;
      transition: all 0.3s ease-in-out;
      svg{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    p{
      margin-top: em(50, 18);
      margin-bottom: em(50, 18);
      text-align: left;
      transform: translateY(10px);
      transition: all 0.3s ease-in-out;
    }
  }
  .carousel-kit{
    width: 100%;
    height: 390px;
    display: none;
    background: #0C1020;
    position: relative;
    li{
      display: block;
      width: 100%;
      color: white;
      background: #0C1020;
      box-sizing: border-box;
      padding-top: 60px;
      padding-bottom: 80px;
    }
    figure{
      width: 40vw;
      height: 40vw;
      margin: 0 auto;
    }
    svg{
      max-width: 50%;
      max-height: 50%;
    }
    p{
      margin-left: auto;
      margin-right: auto;
      width: 65%;
      margin-top: em(20, 14);
      margin-bottom: 0;
      max-width: 260px;
      font-size: em(14);
      letter-spacing: 0;
      line-height: em(20, 14);
    }
  }
  &__share{
    .btn-share{
      margin: 0 auto;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    margin: em(40) 0;
    padding: em(40) 0;
    background: #0c1020;
    color: white;
    .container{
      padding: 0;
      .title-h4{
        padding: 0 1rem;
        //margin-bottom: 3.8rem;
        max-width: 250px;
        margin-bottom: 0;
      }
    }
    &__icons{
      margin: em(20) 0;
      display: none;
    }
    .carousel-kit{
      display: block;
    }
    li{
      /*padding: 0 em(80);

      &:not(:last-child){
        margin-bottom: em(60);
      }*/
    }
  }
}
section.share{
  display: none;
}
@media screen and (max-width: $mobile-breakpoint) {
  section{
    .title-h4{
      font-size: em(20);
      line-height: em(25, 20);
      letter-spacing: em(-0.15, 20);
    }
    .title-h2{
      font-size: em(31);
      line-height: em(40, 35);
      letter-spacing: em(-0.15, 35);
    }
    &.reverse-on-mobile{
      .row{
        flex-direction: column-reverse;
        div:last-child{
          padding-top: 0;
          padding-bottom: 1.25em;
        }
      }
    }
  }
  .kit__share{
    display: none;
  }
  section.share{
    display: flex;
  }
}

.kit-text{
  padding: 0;

  @media screen and (max-width: $mobile-breakpoint) {
    padding: em(20) $mobile_padding*2 0;
  }
}
</style>
