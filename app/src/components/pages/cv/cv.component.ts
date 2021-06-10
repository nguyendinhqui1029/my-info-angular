import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/model/card.model';
import { InfoCardModel } from 'src/model/info-card.model';
import { TitleModel } from 'src/model/title.model';
import { JsonService } from 'src/service/json.service';
@Component({
  selector: 'cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {
  titleModelSummary: TitleModel = { classIcon: 'icon-title-summary', classContent: 'content-title-summary', classLine: 'line-title-summary', contentTitle: 'Qui', showIcon: true, showLine: true, iconName: "home" };
  cardModelSummary: CardModel = { title: 'Job title', date: '20-11-2019', organization: 'DXC Company', address: 'Etow 5', descriptive: 'I join DXC company ...  <ul><li>a1</li></ul>', classDescriptive: 'descriptive' };
  cardModel: CardModel = { title: 'Job title', date: '20-11-2019', organization: 'DXC Company', address: 'Etow 5', descriptive: 'I join DXC company ...  <ul><li>a1</li></ul>', classDescriptive: 'descriptive' };
  infoCardModel: InfoCardModel;
  listSkill: any[] = [];
  summarySection: any;
  constructor(private jsonService: JsonService) {
    this.jsonService.getJSON('./assets/config/personal-information.json').subscribe(personalInfo => {
      this.infoCardModel = this.createPersonalInfo(personalInfo);
      this.listSkill = this.createSectionSkill(personalInfo.skill);
      this.summarySection = this.createSummary(personalInfo.summary);
    });
  }

  createSummary(summary) {
    return {
      title: { classIcon: 'icon-title-summary', classContent: 'content-title-summary', classLine: 'line-title-summary', contentTitle: summary.header, showIcon: true, showLine: true, iconName: summary.icon },
      cardModel: { title: '', date: '', organization: '', address: '', descriptive: summary.content, classDescriptive: 'descriptive' }
    };
  }

  createPersonalInfo(personalInfo) {
    return {
      name: this.concatFullName(personalInfo.lastName, personalInfo.fistName, personalInfo.middleName),
      role: personalInfo.role,
      image: personalInfo.avatar,
      infoContacts: [
        {
          title: 'Address',
          icon: 'place',
          value: this.concatFullAddress(personalInfo.address)
        },
        ...this.getListCommunications(personalInfo.communications)
      ],
      classRole: 'role',
      className: 'name'
    };
  };

  createSectionSkill(listSkill) {
    return listSkill.map(skill => {
      return {
        titleModel: {
          classIcon: 'icon-title-summary', classContent: 'content-title-summary', classLine: 'line-title-summary', contentTitle: skill.skillName, showIcon: true, showLine: true, iconName: skill.icon
        },
        listSkill: skill.childSkill
      }
    });
  }

  getListCommunications(communications: any[]) {
    return communications.map(communications => {
      return {
        title: communications.id,
        icon: communications.icon,
        value: communications.value
      }
    })
  }

  concatFullName(lastName, fistName, middleName) {
    return `${lastName} ${fistName} ${middleName}`;
  }

  concatFullAddress(address) {
    let fullAddress = '';
    fullAddress = `${address.No}/${address.Cluster}, 
    ${address.Hamlet}, ${address.Commune}, ${address.District}, ${address.provinceCity}`;
    return fullAddress;
  }
  ngOnInit(): void { }
}
