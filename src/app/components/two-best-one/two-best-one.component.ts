import { Component, OnInit } from '@angular/core';
import { engines } from 'src/app/constants/engines';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-two-best-one',
  templateUrl: './two-best-one.component.html',
  styleUrls: ['./two-best-one.component.scss'],
})
export class TwoBestOneComponent implements OnInit {
  thinkAssistantOne: string =
    'Eres AssistantOne, Tienes un hermano el AssistantTwo, junto a él debes deducir y debatir como dar solución al siguiente prompt: ';
  thinkAssistantTwo: string =
    'Eres AssistantTwo Tienes un hermano el AssistantOne, junto a él debes deducir y debatir como dar solución al siguiente prompt: ';

  conversation: string[] = [];
  initialPrompt: string = '';

  constructor(private gptService: ChatService) {}

  ngOnInit() {}

  async startConversation() {
    let prompt = this.initialPrompt;
    for (let i = 0; i < 5; i++) {
      const resAssistantOne = await this.assistantOne(prompt);
      this.conversation.push(`AssistantOne: ${resAssistantOne}`);
      const resAssistantTwo = await this.assistantTwo(resAssistantOne);
      this.conversation.push(`AssistantTwo: ${resAssistantTwo}`);
      prompt = resAssistantTwo;
    }
  }

  async assistantOne(prompt: string): Promise<string> {
    const resAssistantOne = await this.gptService.sendMessage(
      prompt,
      this.thinkAssistantOne,
      engines.GPT_3_5_TURBO
    );
    return resAssistantOne;
  }

  async assistantTwo(prompt: string): Promise<string> {
    const resAssistantTwo = await this.gptService.sendMessage(
      prompt,
      this.thinkAssistantTwo,
      engines.GPT_3_5_TURBO
    );
    return resAssistantTwo;
  }
}
