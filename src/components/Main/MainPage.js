import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";
import Profile from "../Profile/Profile";

function MainPage() {
  return (
    <>
    <div>
      <Profile />
      <ChatList />
      <GroupList />
    </div>

 <div className="slider-cont">
    <section class="auto-slider">
            <div id="slider">
                <figure>
                    <img src="https://www.teacherboards.co.uk/community/wp-content/uploads/2018/04/shutterstock_493599385.jpg" alt="Image"/>

                    <img src="https://images.techhive.com/images/article/2016/08/mobile-devices-100678580-large.jpg" alt="Image"/>

                    <img src="https://d1dlh1v05qf6d3.cloudfront.net/information/uploads/2017/05/Screen-shot-2017-05-12-at-9.51.01-AM.png" alt="Image"/>

                    <img src="https://blog.socialmediastrategiessummit.com/wp-content/uploads/2017/11/26843056822_74210651b1_b-1024x630.jpg?x89927" alt="Image"/>

                    <img src="https://www.teacherboards.co.uk/community/wp-content/uploads/2018/04/shutterstock_493599385.jpg" alt="Image"/>
                </figure>
                <div class="indicator"></div>
    </div>
</section>
</div>



    </>
  );
}

export default MainPage;
